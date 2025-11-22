import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box textAlign="center" color="black" sx={{ mt: 4 }}>
      <Typography variant="body2" sx={{ opacity: 0.9 }}>
        100% Free • No Sign-up Required • Files deleted after 1 hour
      </Typography>
      <Typography variant="caption" sx={{ opacity: 0.8 }}>
        Powered by FFmpeg
      </Typography>
    </Box>
  );
}

export default Footer;
