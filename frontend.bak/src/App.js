import React, { useState } from "react";
import axios from "axios";
import "./App.css";

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
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>WebM to MP4 Converter</h1>
          <p className="subtitle">Free & Fast Video Conversion</p>
        </header>

        <div className="converter-box">
          {!downloadUrl ? (
            <>
              <div className="upload-area">
                <input
                  id="file-input"
                  type="file"
                  accept=".webm"
                  onChange={handleFileChange}
                  className="file-input"
                />
                <label htmlFor="file-input" className="file-label">
                  <div className="upload-icon">📁</div>
                  <span>{file ? file.name : "Choose WebM file"}</span>
                  <p className="file-hint">Click to browse or drag and drop</p>
                </label>
              </div>

              {file && (
                <div className="file-info">
                  <p>
                    Selected: <strong>{file.name}</strong>
                  </p>
                  <p>
                    Size:{" "}
                    <strong>{(file.size / 1024 / 1024).toFixed(2)} MB</strong>
                  </p>
                </div>
              )}

              {uploading && (
                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="progress-text">
                    {progress < 100
                      ? `Uploading... ${progress}%`
                      : "Converting..."}
                  </p>
                </div>
              )}

              {error && <div className="error-message">{error}</div>}

              <button
                className="convert-btn"
                onClick={handleUpload}
                disabled={!file || uploading}
              >
                {uploading ? "Converting..." : "Convert to MP4"}
              </button>
            </>
          ) : (
            <div className="success-container">
              <div className="success-icon">✓</div>
              <h2>Conversion Complete!</h2>
              <p className="success-filename">{fileName}</p>

              <div className="action-buttons">
                <button className="download-btn" onClick={handleDownload}>
                  Download MP4
                </button>
                <button className="reset-btn" onClick={handleReset}>
                  Convert Another
                </button>
              </div>
            </div>
          )}
        </div>

        <footer className="footer">
          <p>100% Free • No Sign-up Required • Files deleted after 1 hour</p>
          <p className="tech-info">Powered by FFmpeg</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
