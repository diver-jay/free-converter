import React, { useState } from "react";
import axios from "axios";
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  CloudUpload,
  CheckCircle,
  Download,
  Refresh,
  VideoFile,
  ExpandMore,
  HelpOutline,
  PlayCircleOutline,
} from "@mui/icons-material";
import Layout from "./components/Layout";

function App() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.name.toLowerCase().endsWith(".webm")) {
        setError("Please select a .webm file");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError("");
      setDownloadUrl("");
      setFileName("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setUploading(true);
    setProgress(0);
    setError("");
    setDownloadUrl("");

    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await axios.post(`${API_URL}/api/upload`, formData, {
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
        setDownloadUrl(`${API_URL}${response.data.downloadUrl}`);
        setFileName(response.data.filename);
        setProgress(100);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Upload failed. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
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
    document.getElementById("file-input").value = "";
  };

  return (
    <Layout>
      <Stack spacing={3}>
        {/* Main Card */}
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
                      accept=".webm"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="file-input" style={{ cursor: "pointer" }}>
                      <Stack spacing={2} alignItems="center">
                        <CloudUpload
                          sx={{ fontSize: 64, color: "primary.main" }}
                        />
                        <Typography variant="h6">
                          {file ? file.name : "Choose WebM file"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Click to browse or drag and drop
                        </Typography>
                      </Stack>
                    </label>
                  </Paper>

                  {/* File Info */}
                  {file && (
                    <Paper sx={{ p: 2, bgcolor: "primary.lighter" }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <VideoFile color="primary" />
                        <Box>
                          <Typography variant="body2">
                            Selected: <strong>{file.name}</strong>
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Size:{" "}
                            <strong>
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </strong>
                          </Typography>
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
                      <Typography
                        variant="body2"
                        textAlign="center"
                        sx={{ mt: 1 }}
                      >
                        {progress < 100
                          ? `Uploading... ${progress}%`
                          : "Converting..."}
                      </Typography>
                    </Box>
                  )}

                  {/* Error */}
                  {error && (
                    <Alert severity="error" onClose={() => setError("")}>
                      {error}
                    </Alert>
                  )}

                  {/* Convert Button */}
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<CloudUpload />}
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    fullWidth
                    sx={{ py: 1.5 }}
                  >
                    {uploading ? "Converting..." : "Convert to MP4"}
                  </Button>
                </Stack>
              ) : (
                <Stack spacing={3} alignItems="center" textAlign="center">
                  {/* Success State */}
                  <CheckCircle sx={{ fontSize: 80, color: "success.main" }} />
                  <Typography variant="h4" fontWeight="bold">
                    Conversion Complete!
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
                      Download MP4
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<Refresh />}
                      onClick={handleReset}
                      fullWidth
                      sx={{ py: 1.5 }}
                    >
                      Convert Another
                    </Button>
                  </Stack>
                </Stack>
              )}
            </CardContent>
          </Card>

          {/* How to Use Section */}
          <Card elevation={4}>
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <PlayCircleOutline color="primary" />
                  <Typography variant="h5" fontWeight="bold">
                    사용 방법
                  </Typography>
                </Box>
                <Divider />
                <List>
                  <ListItem>
                    <ListItemText
                      primary="1. WebM 파일 선택"
                      secondary="업로드 영역을 클릭하거나 드래그하여 WebM 파일을 선택하세요"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="2. 변환 시작"
                      secondary="'Convert to MP4' 버튼을 클릭하면 자동으로 변환이 시작됩니다"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="3. 다운로드"
                      secondary="변환이 완료되면 'Download MP4' 버튼을 클릭하여 파일을 다운로드하세요"
                    />
                  </ListItem>
                </List>
              </Stack>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card elevation={4}>
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <HelpOutline color="primary" />
                  <Typography variant="h5" fontWeight="bold">
                    자주 묻는 질문 (FAQ)
                  </Typography>
                </Box>
                <Divider />
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight={600}>WebM이 무엇인가요?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color="text.secondary">
                      WebM은 구글이 개발한 오픈소스 동영상 포맷으로, 주로 웹에서 사용됩니다.
                      하지만 일부 기기나 플레이어에서는 재생이 안 되어 MP4로 변환이 필요합니다.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight={600}>변환된 파일은 어디에 저장되나요?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color="text.secondary">
                      변환된 파일은 서버에 임시로 저장되며, 1시간 후 자동으로 삭제됩니다.
                      다운로드 후에는 즉시 브라우저의 다운로드 폴더에 저장됩니다.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight={600}>파일 크기 제한이 있나요?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color="text.secondary">
                      현재 파일 크기 제한은 없지만, 큰 파일일수록 변환 시간이 오래 걸릴 수 있습니다.
                      안정적인 변환을 위해 100MB 이하의 파일을 권장합니다.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight={600}>안전한가요?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color="text.secondary">
                      네, 모든 파일은 안전하게 처리되며 1시간 후 자동으로 삭제됩니다.
                      파일은 변환 목적으로만 사용되며, 제3자와 공유되지 않습니다.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight={600}>정말 무료인가요?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color="text.secondary">
                      네, 100% 무료입니다. 회원가입도 필요 없으며, 숨겨진 비용이 전혀 없습니다.
                      언제든지 자유롭게 사용하실 수 있습니다.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Stack>
            </CardContent>
          </Card>
      </Stack>
    </Layout>
  );
}

export default App;
