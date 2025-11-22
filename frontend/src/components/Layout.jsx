import React from "react";
import { Box, Container, Typography } from "@mui/material";

function Layout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        py: "80px",
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Box textAlign="center" color="black" sx={{ mb: 3 }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            Video Converter
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Free & Fast Video Conversion
          </Typography>
        </Box>

        {/* Main Content */}
        {children}
      </Container>

      {/* Footer */}
      <Box textAlign="center" color="black" sx={{ mt: 4 }}>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          100% Free • No Sign-up Required • Files deleted after 1 hour
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          Powered by FFmpeg
        </Typography>
      </Box>
    </Box>
  );
}

export default Layout;
