const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const { v4: uuidv4 } = require("uuid");
const os = require("os");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Auto-detect CPU count, or use env variable for override
const FFMPEG_THREADS = process.env.FFMPEG_THREADS || os.cpus().length;
console.log(`FFmpeg will use ${FFMPEG_THREADS} threads (${os.cpus().length} CPUs available)`);

// Middleware
app.use(cors());
app.use(express.json());

// Create necessary directories
const UPLOAD_DIR = path.join(__dirname, "uploads");
const CONVERTED_DIR = path.join(__dirname, "converted");
const LOG_DIR = path.join(__dirname, "logs");

[UPLOAD_DIR, CONVERTED_DIR, LOG_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Logging utility
function logConversion(type, data) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    type: type, // 'video' or 'document'
    ...data
  };

  const today = new Date().toISOString().split('T')[0];
  const logFile = path.join(LOG_DIR, `conversions-${today}.json`);

  try {
    fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
    console.log(`📊 Logged ${type} conversion:`, logEntry);
  } catch (error) {
    console.error('Failed to write log:', error);
  }
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit
  fileFilter: (req, file, cb) => {
    // Support common video formats
    const allowedExtensions = [".webm", ".mp4", ".mov", ".avi", ".mkv", ".flv"];
    const allowedMimeTypes = [
      "video/webm",
      "video/mp4",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-matroska",
      "video/x-flv",
    ];

    const ext = path.extname(file.originalname).toLowerCase();
    if (
      allowedExtensions.includes(ext) ||
      allowedMimeTypes.includes(file.mimetype)
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only video files are allowed (webm, mp4, mov, avi, mkv, flv)"
        )
      );
    }
  },
});

// Configure multer for document uploads
const documentUpload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: (req, file, cb) => {
    // Support PDF and DOCX formats
    const allowedExtensions = [".pdf", ".docx"];
    const allowedMimeTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const ext = path.extname(file.originalname).toLowerCase();
    if (
      allowedExtensions.includes(ext) ||
      allowedMimeTypes.includes(file.mimetype)
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and DOCX files are allowed"));
    }
  },
});

// Clean up old files (older than 1 hour)
const cleanupOldFiles = () => {
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;

  [UPLOAD_DIR, CONVERTED_DIR].forEach((dir) => {
    fs.readdir(dir, (err, files) => {
      if (err) return;

      files.forEach((file) => {
        const filePath = path.join(dir, file);
        fs.stat(filePath, (err, stats) => {
          if (err) return;

          if (now - stats.mtimeMs > oneHour) {
            fs.unlink(filePath, (err) => {
              if (err) console.error(`Error deleting ${filePath}:`, err);
            });
          }
        });
      });
    });
  });
};

// Run cleanup every 30 minutes
setInterval(cleanupOldFiles, 30 * 60 * 1000);

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Universal Format Converter API",
    description: "Convert between video formats and document formats",
    features: {
      video: {
        supportedFormats: {
          input: ["webm", "mp4", "mov", "avi", "mkv", "flv"],
          output: ["mp4", "webm", "mov", "avi", "mkv", "flv"],
        },
        combinations: "36 combinations (any to any)",
      },
      document: {
        supportedFormats: {
          input: ["pdf", "docx"],
          output: ["pdf", "docx"],
        },
        combinations: "PDF ↔ DOCX (bidirectional)",
      },
    },
    endpoints: {
      videoUpload: {
        method: "POST",
        path: "/api/upload",
        description: "Upload and convert video",
        parameters: {
          video: "Video file (form-data)",
          outputFormat:
            "Output format: mp4, webm, mov, avi, mkv, or flv (optional, default: mp4)",
        },
      },
      documentUpload: {
        method: "POST",
        path: "/api/upload/document",
        description: "Upload and convert document (PDF ↔ DOCX)",
        parameters: {
          document: "Document file (form-data)",
          note: "Output format is automatically determined (PDF→DOCX, DOCX→PDF)",
        },
      },
      download: {
        method: "GET",
        path: "/api/download/:filename",
        description: "Download converted file (video or document)",
      },
      health: {
        method: "GET",
        path: "/api/health",
        description: "API health check",
      },
    },
    popularConversions: {
      video: [
        "webm → mp4",
        "mov → mp4",
        "avi → mp4",
        "mp4 → webm",
        "mkv → mp4",
      ],
      document: ["pdf → docx", "docx → pdf"],
    },
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Upload and convert endpoint
app.post("/api/upload", upload.single("video"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Support all common video output formats
  const outputFormat = req.body.outputFormat || req.query.outputFormat || "mp4";
  const allowedOutputFormats = ["mp4", "webm", "mov", "avi", "mkv", "flv"];

  if (!allowedOutputFormats.includes(outputFormat)) {
    return res.status(400).json({
      error: "Invalid output format",
      allowedFormats: allowedOutputFormats,
    });
  }

  const inputPath = req.file.path;
  const outputFilename = `${path.parse(req.file.filename).name}.${outputFormat}`;
  const outputPath = path.join(CONVERTED_DIR, outputFilename);

  console.log(`Converting ${req.file.originalname} to ${outputFormat}...`);

  // Track conversion time
  let conversionStartTime;

  // Simple conversion - ffmpeg auto-selects codecs based on output format
  const converter = ffmpeg(inputPath).output(outputPath);

  // Add format-specific options optimized for speed
  if (outputFormat === "mp4") {
    converter
      .videoCodec("libx264")
      .audioCodec("aac")
      .outputOptions([
        '-preset ultrafast',  // Maximum encoding speed
        '-crf 23',            // Constant quality (23 = good quality/speed balance)
        `-threads ${FFMPEG_THREADS}`,  // Use all available CPUs
        '-tune zerolatency',  // Minimize latency
        '-r 30',              // Limit output to 30fps (fixes high fps screen recordings)
        '-vsync cfr'          // Constant frame rate (fixes variable frame rate issues)
      ])
      .videoFilters("scale=trunc(iw/2)*2:trunc(ih/2)*2");
  } else if (outputFormat === "webm") {
    converter
      .videoCodec("libvpx")
      .audioCodec("libvorbis")
      .outputOptions([
        '-cpu-used 5',        // libvpx speed setting (0-5, higher = faster)
        '-deadline realtime', // Realtime encoding mode
        `-threads ${FFMPEG_THREADS}`
      ]);
  } else if (outputFormat === "mov") {
    converter
      .videoCodec("libx264")
      .audioCodec("aac")
      .outputOptions([
        '-preset ultrafast',
        '-crf 23',
        `-threads ${FFMPEG_THREADS}`,
        '-tune zerolatency',
        '-r 30',
        '-vsync cfr'
      ]);
  } else if (outputFormat === "avi") {
    converter
      .videoCodec("mpeg4")
      .audioCodec("libmp3lame")
      .outputOptions([
        `-threads ${FFMPEG_THREADS}`,
        '-r 30',
        '-vsync cfr'
      ]);
  } else if (outputFormat === "mkv") {
    converter
      .videoCodec("libx264")
      .audioCodec("aac")
      .outputOptions([
        '-preset ultrafast',
        '-crf 23',
        `-threads ${FFMPEG_THREADS}`,
        '-tune zerolatency',
        '-r 30',
        '-vsync cfr'
      ]);
  }
  // flv uses auto-selected codecs

  converter
    .on("start", (commandLine) => {
      conversionStartTime = Date.now();
      console.log("=".repeat(80));
      console.log(`⏱️  CONVERSION STARTED at ${new Date().toISOString()}`);
      console.log(`📁 Input: ${req.file.originalname} (${(req.file.size / 1024 / 1024).toFixed(2)} MB)`);
      console.log(`🎯 Output: ${outputFormat.toUpperCase()}`);
      console.log(`🧵 Threads: ${FFMPEG_THREADS}`);
      console.log("=".repeat(80));
      console.log("FFmpeg command:", commandLine);
    })
    .on("progress", (progress) => {
      const elapsed = ((Date.now() - conversionStartTime) / 1000).toFixed(1);
      console.log(`Processing: ${progress.percent?.toFixed(2)}% done (${elapsed}s elapsed)`);
    })
    .on("end", () => {
      const conversionEndTime = Date.now();
      const duration = ((conversionEndTime - conversionStartTime) / 1000).toFixed(2);
      console.log("=".repeat(80));
      console.log(`✅ CONVERSION COMPLETED at ${new Date().toISOString()}`);
      console.log(`⏱️  Total time: ${duration} seconds`);
      console.log("=".repeat(80));

      // Log successful conversion
      logConversion('video', {
        success: true,
        inputFormat: path.extname(req.file.originalname).toLowerCase(),
        outputFormat: outputFormat,
        fileSize: req.file.size,
        originalName: req.file.originalname,
        conversionTime: duration,
        threads: FFMPEG_THREADS
      });

      // Delete original uploaded file
      fs.unlink(inputPath, (err) => {
        if (err) console.error("Error deleting uploaded file:", err);
      });

      res.json({
        success: true,
        message: "Conversion successful",
        downloadUrl: `/api/download/${outputFilename}`,
        filename: outputFilename,
        inputFormat: path.extname(req.file.originalname).toLowerCase(),
        outputFormat: outputFormat,
      });
    })
    .on("error", (err) => {
      console.error("Conversion error:", err);

      // Log failed conversion
      logConversion('video', {
        success: false,
        inputFormat: path.extname(req.file.originalname).toLowerCase(),
        outputFormat: outputFormat,
        fileSize: req.file.size,
        originalName: req.file.originalname,
        error: err.message
      });

      // Clean up files on error
      fs.unlink(inputPath, () => {});
      if (fs.existsSync(outputPath)) {
        fs.unlink(outputPath, () => {});
      }

      res.status(500).json({
        error: "Conversion failed",
        details: err.message,
      });
    })
    .run();
});

// Document conversion endpoint (PDF ↔ DOCX)
app.post(
  "/api/upload/document",
  documentUpload.single("document"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const inputExt = path.extname(req.file.originalname).toLowerCase();
    const inputPath = req.file.path;

    // Get output format from request, or default to opposite format
    let outputFormat = req.body.outputFormat || req.query.outputFormat;

    // If no output format specified, determine based on input
    if (!outputFormat) {
      if (inputExt === ".pdf") {
        outputFormat = "docx";
      } else if (inputExt === ".docx") {
        outputFormat = "pdf";
      } else {
        return res.status(400).json({ error: "Invalid file format" });
      }
    }

    // Validate output format
    const allowedDocumentFormats = ["pdf", "docx"];
    if (!allowedDocumentFormats.includes(outputFormat)) {
      return res.status(400).json({
        error: "Invalid output format",
        allowedFormats: allowedDocumentFormats,
      });
    }

    // Check if input and output formats are the same
    if (inputExt === `.${outputFormat}`) {
      return res.status(400).json({
        error: "Input and output formats cannot be the same",
        message: `Your file is already in ${outputFormat.toUpperCase()} format`,
      });
    }

    const outputFilename = `${path.parse(req.file.filename).name}.${outputFormat}`;
    const outputPath = path.join(CONVERTED_DIR, outputFilename);

    console.log(
      `Converting ${req.file.originalname} to ${outputFormat.toUpperCase()}...`
    );

    // CASE 1: DOCX -> PDF (Use LibreOffice)
    if (inputExt === ".docx") {
      const { exec } = require("child_process");
      const command = `soffice --headless --convert-to ${outputFormat} "${inputPath}" --outdir "${CONVERTED_DIR}"`;

      exec(command, (error, stdout, stderr) => {
        // Delete original uploaded file
        fs.unlink(inputPath, (err) => {
          if (err) console.error("Error deleting uploaded file:", err);
        });

        if (error) {
          console.error("Conversion error:", error);

          // Log failed conversion
          logConversion('document', {
            success: false,
            method: 'libreoffice',
            inputFormat: inputExt,
            outputFormat: outputFormat,
            fileSize: req.file.size,
            originalName: req.file.originalname,
            error: error.message
          });

          return res.status(500).json({
            error: "Conversion failed",
            details: error.message,
          });
        }

        // LibreOffice creates file with original name + new extension
        const expectedOutput = path.join(
          CONVERTED_DIR,
          `${path.parse(req.file.filename).name}.${outputFormat}`
        );

        if (!fs.existsSync(expectedOutput)) {
          return res.status(500).json({
            error: "Conversion failed",
            details: "Output file not created",
          });
        }

        console.log("Conversion completed (LibreOffice)");

        // Log successful conversion
        logConversion('document', {
          success: true,
          method: 'libreoffice',
          inputFormat: inputExt,
          outputFormat: outputFormat,
          fileSize: req.file.size,
          originalName: req.file.originalname
        });

        res.json({
          success: true,
          message: "Conversion successful",
          downloadUrl: `/api/download/${outputFilename}`,
          filename: outputFilename,
          inputFormat: inputExt,
          outputFormat: outputFormat,
        });
      });
    }
    // CASE 2: PDF -> DOCX (Use Python pdf2docx)
    else if (inputExt === ".pdf") {
      const { spawn } = require("child_process");
      const pythonScript = path.join(__dirname, "convert_pdf.py");

      console.log("Using Python pdf2docx for PDF to DOCX conversion...");

      const pythonProcess = spawn("python3", [
        pythonScript,
        inputPath,
        outputPath,
      ]);

      let stdoutData = "";
      let stderrData = "";

      pythonProcess.stdout.on("data", (data) => {
        stdoutData += data.toString();
        console.log(`Python: ${data.toString().trim()}`);
      });

      pythonProcess.stderr.on("data", (data) => {
        stderrData += data.toString();
        console.error(`Python error: ${data.toString().trim()}`);
      });

      pythonProcess.on("close", (code) => {
        // Delete original uploaded file
        fs.unlink(inputPath, (err) => {
          if (err) console.error("Error deleting uploaded file:", err);
        });

        if (code === 0 && fs.existsSync(outputPath)) {
          console.log("Conversion completed (Python pdf2docx)");

          // Log successful conversion
          logConversion('document', {
            success: true,
            method: 'pdf2docx',
            inputFormat: inputExt,
            outputFormat: outputFormat,
            fileSize: req.file.size,
            originalName: req.file.originalname
          });

          res.json({
            success: true,
            message: "Conversion successful",
            downloadUrl: `/api/download/${outputFilename}`,
            filename: outputFilename,
            inputFormat: inputExt,
            outputFormat: outputFormat,
          });
        } else {
          console.error(`Python script exited with code ${code}`);

          // Log failed conversion
          logConversion('document', {
            success: false,
            method: 'pdf2docx',
            inputFormat: inputExt,
            outputFormat: outputFormat,
            fileSize: req.file.size,
            originalName: req.file.originalname,
            error: stderrData || "PDF to DOCX conversion failed"
          });

          res.status(500).json({
            error: "Conversion failed",
            details: stderrData || "PDF to DOCX conversion failed",
          });
        }
      });

      pythonProcess.on("error", (error) => {
        console.error("Failed to start Python process:", error);
        fs.unlink(inputPath, () => {});

        // Log failed conversion
        logConversion('document', {
          success: false,
          method: 'pdf2docx',
          inputFormat: inputExt,
          outputFormat: outputFormat,
          fileSize: req.file.size,
          originalName: req.file.originalname,
          error: "Python process failed: " + error.message
        });

        res.status(500).json({
          error: "Conversion service unavailable",
          details: error.message,
        });
      });
    }
  }
);

// Download converted file
app.get("/api/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(CONVERTED_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  res.download(filePath, filename, (err) => {
    if (err) {
      console.error("Download error:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Download failed" });
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
