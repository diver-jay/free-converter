import { Box } from "@mui/material";
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
        <Box
          component="img"
          src="/logo.svg"
          alt="OpenConvert"
          sx={{
            height: {
              xs: "32px",
              md: "40px",
            },
          }}
        />

        <LanguageSwitcher />
      </Box>
    </Box>
  );
}

export default Header;
