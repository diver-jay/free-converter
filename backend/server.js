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
    if (
      file.mimetype === "video/webm" ||
      path.extname(file.originalname).toLowerCase() === ".webm"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only .webm files are allowed!"));
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
    message: "WebM to MP4 Converter API",
    endpoints: {
      upload: "POST /api/upload",
      download: "GET /api/download/:filename",
      health: "GET /api/health",
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

  const inputPath = req.file.path;
  const outputFilename = `${path.parse(req.file.filename).name}.mp4`;
  const outputPath = path.join(CONVERTED_DIR, outputFilename);

  console.log(`Converting ${req.file.originalname}...`);

  ffmpeg(inputPath)
    .output(outputPath)
    .videoCodec("libx264")
    .audioCodec("aac")
    // 홀수 해상도를 짝수로 자동 조정 (libx264 요구사항)
    .videoFilters("scale=trunc(iw/2)*2:trunc(ih/2)*2")
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
