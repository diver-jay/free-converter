import { Box, Typography } from "@mui/material";

function Header() {
  return (
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
  );
}

export default Header;
