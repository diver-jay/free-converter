import { Box, Typography } from "@mui/material";
import LanguageSwitcher from "../features/language-switcher/language-switcher";

function Header() {
  return (
    <Box
      sx={{
        width: "100%",
        background: "white",
        boxShadow: "0 3px 24px rgba(0,0,0,.08)",
      }}
    >
      <Box
        sx={{
          maxWidth: "1280px",
          margin: "0 auto",
          height: {
            xs: "56px",
            md: "88px",
          },
          px: {
            xs: "24px",
            md: "88px",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="black">
          OpenConvert
        </Typography>

        <LanguageSwitcher />
      </Box>
    </Box>
  );
}

export default Header;
