'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslations } from "next-intl";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  LinearProgress,
  Alert,
  Stack,
  Paper,
  ButtonGroup,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  CloudUpload,
  CheckCircle,
  Download,
  Refresh,
  VideoFile,
  ArrowDropDown,
} from "@mui/icons-material";
import { spacing } from "../../theme";
import { isFileType } from "../../utils/fileTypeDetection";

function Converter() {
  const t = useTranslations();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [outputFormat, setOutputFormat] = useState("mp4");
  const [anchorEl, setAnchorEl] = useState(null);
  const [jobId, setJobId] = useState(null);
  const open = Boolean(anchorEl);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  const allowedVideoExtensions = [
    ".webm",
    ".mp4",
    ".mov",
    ".avi",
    ".mkv",
    ".flv",
  ];
  const allowedDocumentExtensions = [".pdf", ".docx"];
  const allowedExtensions = [
    ...allowedVideoExtensions,
    ...allowedDocumentExtensions,
  ];

  const isDocumentFile = (file) => isFileType(file, allowedDocumentExtensions);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!isFileType(selectedFile, allowedExtensions)) {
        setError(
          "Please select a valid file (Video: WebM, MP4, MOV, AVI, MKV, FLV | Document: PDF, DOCX)"
        );
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError("");
      setDownloadUrl("");
      setFileName("");

      // Set default output format based on file type
      if (isDocumentFile(selectedFile)) {
        const ext = selectedFile.name.split(".").pop().toLowerCase();
        setOutputFormat(ext === "pdf" ? "docx" : "pdf");
      } else {
        setOutputFormat("mp4");
      }
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFormatSelect = (format) => {
    setOutputFormat(format);
    handleMenuClose();
  };

  // SSE: Subscribe to conversion progress
  useEffect(() => {
    if (!jobId) return;

    console.log(`[SSE] Connecting to jobId: ${jobId}`);
    const eventSource = new EventSource(`${API_URL}/api/progress/${jobId}`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(`[SSE] Received:`, data);

      if (data.status === "processing") {
        setProgress(data.percent);
      } else if (data.status === "completed") {
        setProgress(100);
        setDownloadUrl(`${API_URL}${data.downloadUrl}`);
        setFileName(data.filename);
        setUploading(false);
        console.log(`[SSE] Conversion completed`);
      } else if (data.status === "error") {
        setError(data.error || "Conversion failed");
        setUploading(false);
        console.error(`[SSE] Conversion error:`, data.error);
      }
    };

    eventSource.onerror = (err) => {
      console.error(`[SSE] Connection error:`, err);
      eventSource.close();
    };

    // Cleanup on unmount or new upload
    return () => {
      eventSource.close();
    };
  }, [jobId]);

  const handleUpload = async () => {
    if (!file) {
      setError(t("errors.selectFile"));
      return;
    }

    setUploading(true);
    setProgress(0);
    setError("");
    setDownloadUrl("");
    setJobId(null);

    const formData = new FormData();
    const isDocument = isDocumentFile(file);

    // Document files use /api/upload/document endpoint
    // Video files use /api/upload endpoint
    if (isDocument) {
      formData.append("document", file);
      formData.append("outputFormat", outputFormat);
    } else {
      formData.append("video", file);
      formData.append("outputFormat", outputFormat);
    }

    const endpoint = isDocument ? "/api/upload/document" : "/api/upload";

    try {
      const response = await axios.post(`${API_URL}${endpoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      if (response.data.success) {
        console.log('[Upload] Response:', response.data);

        // Video files: start SSE progress tracking
        if (response.data.jobId) {
          console.log('[Upload] Starting SSE tracking with jobId:', response.data.jobId);
          setJobId(response.data.jobId);
        }
        // Document files: handle synchronously (still have downloadUrl in response)
        else if (response.data.downloadUrl) {
          console.log('[Upload] Document conversion completed');
          setDownloadUrl(`${API_URL}${response.data.downloadUrl}`);
          setFileName(response.data.filename);
          setProgress(100);
          setUploading(false);
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || t("errors.uploadFailed"));
      setUploading(false);
      console.error("Upload error:", err);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
    }
  };

  const handleReset = () => {
    setFile(null);
    setUploading(false);
    setProgress(0);
    setDownloadUrl("");
    setError("");
    setFileName("");
    const fileInput = document.getElementById("file-input");
    if (fileInput) fileInput.value = "";
  };

  return (
    <Card elevation={8}>
      <CardContent sx={{ p: 4 }}>
        {!downloadUrl ? (
          <Stack spacing={3}>
            {/* Upload Area */}
            <Paper
              sx={{
                p: 4,
                textAlign: "center",
                border: "2px dashed",
                borderColor: "primary.main",
                bgcolor: "background.default",
                cursor: "pointer",
                transition: "all 0.3s",
                "&:hover": {
                  bgcolor: "action.hover",
                  borderColor: "primary.dark",
                },
              }}
            >
              <input
                id="file-input"
                type="file"
                accept=".webm,.mp4,.mov,.avi,.mkv,.flv,.pdf,.docx"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="file-input" style={{ cursor: "pointer" }}>
                <Stack spacing={2} alignItems="center">
                  <CloudUpload
                    sx={{ fontSize: spacing.xl, color: "primary.main" }} // 55px
                  />
                  <Typography variant="h6">
                    {file ? file.name : t("upload.chooseFile")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t("upload.dragDrop")}
                  </Typography>
                </Stack>
              </label>
            </Paper>

            {/* File Info */}
            {file && (
              <Paper sx={{ p: 2, bgcolor: "primary.lighter" }}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <VideoFile color="primary" />
                    <Box>
                      <Typography variant="body2">
                        {t("upload.selected")}: <strong>{file.name}</strong>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t("upload.size")}:{" "}
                        <strong>
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </strong>
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Convert Button with Format Selector */}
                  <Box sx={{ display: "flex" }}>
                    <ButtonGroup
                      variant="contained"
                      disabled={uploading}
                      sx={{
                        "& .MuiButton-root": {
                          fontSize: { xs: "0.8rem", sm: "0.875rem" },
                        },
                      }}
                    >
                      <Button
                        startIcon={
                          <CloudUpload
                            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                          />
                        }
                        onClick={handleUpload}
                        sx={{
                          py: { xs: 0.75, sm: 1 },
                          px: { xs: 1.5, sm: 3 },
                        }}
                      >
                        {uploading
                          ? t("upload.converting")
                          : outputFormat.toUpperCase()}
                      </Button>
                      <Button
                        onClick={handleMenuClick}
                        sx={{
                          px: { xs: 1, sm: 1.5 },
                          minWidth: "auto",
                        }}
                      >
                        <ArrowDropDown
                          sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
                        />
                      </Button>
                    </ButtonGroup>
                  </Box>
                </Stack>
              </Paper>
            )}

            {/* Progress */}
            {uploading && (
              <Box>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="body2" textAlign="center" sx={{ mt: 1 }}>
                  {`Converting... ${progress}%`}
                </Typography>
              </Box>
            )}

            {/* Error */}
            {error && (
              <Alert severity="error" onClose={() => setError("")}>
                {error}
              </Alert>
            )}

            {/* Format Selector Menu */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              {file && isDocumentFile(file) ? [
                // Document: PDF <-> DOCX (2 options)
                <MenuItem
                  key="pdf"
                  onClick={() => handleFormatSelect("pdf")}
                  selected={outputFormat === "pdf"}
                >
                  PDF
                </MenuItem>,
                <MenuItem
                  key="docx"
                  onClick={() => handleFormatSelect("docx")}
                  selected={outputFormat === "docx"}
                >
                  DOCX (Word)
                </MenuItem>
              ] : [
                // Video: 6 format options
                <MenuItem
                  key="mp4"
                  onClick={() => handleFormatSelect("mp4")}
                  selected={outputFormat === "mp4"}
                >
                  MP4
                </MenuItem>,
                <MenuItem
                  key="webm"
                  onClick={() => handleFormatSelect("webm")}
                  selected={outputFormat === "webm"}
                >
                  WebM
                </MenuItem>,
                <MenuItem
                  key="mov"
                  onClick={() => handleFormatSelect("mov")}
                  selected={outputFormat === "mov"}
                >
                  MOV
                </MenuItem>,
                <MenuItem
                  key="avi"
                  onClick={() => handleFormatSelect("avi")}
                  selected={outputFormat === "avi"}
                >
                  AVI
                </MenuItem>,
                <MenuItem
                  key="mkv"
                  onClick={() => handleFormatSelect("mkv")}
                  selected={outputFormat === "mkv"}
                >
                  MKV
                </MenuItem>,
                <MenuItem
                  key="flv"
                  onClick={() => handleFormatSelect("flv")}
                  selected={outputFormat === "flv"}
                >
                  FLV
                </MenuItem>
              ]}
            </Menu>
          </Stack>
        ) : (
          <Stack spacing={3} alignItems="center" textAlign="center">
            {/* Success State */}
            <CheckCircle
              sx={{ fontSize: spacing.xxl, color: "success.main" }}
            />{" "}
            {/* 89px */}
            <Typography variant="h4" fontWeight="bold">
              {t("upload.conversionComplete")}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {fileName}
            </Typography>
            {/* Action Buttons */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              width="100%"
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<Download />}
                onClick={handleDownload}
                fullWidth
                sx={{ py: 1.5 }}
              >
                {t("upload.downloadButton")}
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<Refresh />}
                onClick={handleReset}
                fullWidth
                sx={{ py: 1.5 }}
              >
                {t("upload.convertAnother")}
              </Button>
            </Stack>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}

export default Converter;
