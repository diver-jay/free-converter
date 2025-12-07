const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create necessary directories
const UPLOAD_DIR = path.join(__dirname, "uploads");
const CONVERTED_DIR = path.join(__dirname, "converted");

[UPLOAD_DIR, CONVERTED_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

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
    // Phase 1-2: Support common input formats
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
    message: "Video Format Converter API",
    description: "Convert between popular video formats",
    supportedFormats: {
      input: ["webm", "mp4", "mov", "avi", "mkv", "flv"],
      output: ["mp4", "webm"],
    },
    endpoints: {
      upload: {
        method: "POST",
        path: "/api/upload",
        description: "Upload and convert video",
        parameters: {
          video: "Video file (form-data)",
          outputFormat: "Output format: mp4 or webm (optional, default: mp4)",
        },
      },
      download: {
        method: "GET",
        path: "/api/download/:filename",
        description: "Download converted file",
      },
      health: {
        method: "GET",
        path: "/api/health",
        description: "API health check",
      },
    },
    examples: {
      phase1: "Any format → MP4 (webm, mov, avi, mkv, flv → mp4)",
      phase2: "Any format → WebM (mp4, mov, avi → webm)",
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

  // Phase 1-2: Support mp4 and webm output formats
  const outputFormat = req.body.outputFormat || req.query.outputFormat || "mp4";
  const allowedOutputFormats = ["mp4", "webm"];

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

  // Simple conversion - ffmpeg auto-selects codecs based on output format
  const converter = ffmpeg(inputPath).output(outputPath);

  // Add format-specific options if needed
  if (outputFormat === "mp4") {
    converter
      .videoCodec("libx264")
      .audioCodec("aac")
      .videoFilters("scale=trunc(iw/2)*2:trunc(ih/2)*2");
  } else if (outputFormat === "webm") {
    converter.videoCodec("libvpx").audioCodec("libvorbis");
  }

  converter
    .on("start", (commandLine) => {
      console.log("FFmpeg command:", commandLine);
    })
    .on("progress", (progress) => {
      console.log(`Processing: ${progress.percent?.toFixed(2)}% done`);
    })
    .on("end", () => {
      console.log("Conversion completed");

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
