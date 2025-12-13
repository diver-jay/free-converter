import { Box, Stack, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import LanguageSwitcher from "../features/language-switcher/language-switcher";

function Header() {
  return (
    <Box
      sx={{
        width: "100%",
        background: "#C30000", // 2번: 다크 레드
        color: "#FFD700", // 골드 텍스트
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
              xs: "50px",
              md: "80px",
            },
          }}
        />

        <Stack direction="row" spacing={2} alignItems="center">
          <MuiLink component={Link} to="/blog" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Blog
          </MuiLink>
          <LanguageSwitcher />
        </Stack>
      </Box>
    </Box>
  );
}

export default Header;
