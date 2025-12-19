"use client";

import { Box, Stack, Link as MuiLink } from "@mui/material";
import { Link } from "@/i18n/routing";
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
        <MuiLink
          component={Link}
          href="/"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Box
            component="img"
            src="/logo.svg"
            alt="OpenConvert"
            sx={{
              height: "48px",
            }}
          />
        </MuiLink>

        <Stack direction="row" spacing={2} alignItems="center">
          <MuiLink
            component={Link}
            href="/blog"
            sx={{
              color: "white",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Blog
          </MuiLink>
          <LanguageSwitcher />
        </Stack>
      </Box>
    </Box>
  );
}

export default Header;
