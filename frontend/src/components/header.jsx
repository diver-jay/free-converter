"use client";

import {
  AppBar,
  Box,
  Stack,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { Link } from "@/i18n/routing";
import LanguageSwitcher from "../features/language-switcher/language-switcher";

function Header() {
  return (
    <AppBar position="static">
      <Box
        sx={{
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
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
          sx={{ textDecoration: "none" }}
        >
          <Typography variant="subtitle1" component="div" sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
            OPEN <span style={{ fontWeight: 400, opacity: 0.9 }}>CONVERT</span>
          </Typography>
        </MuiLink>

        <Stack direction="row" spacing={2} alignItems="center">
          <MuiLink
            component={Link}
            href="/blog"
            sx={{
              color: "text.primary",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Blog
          </MuiLink>
          <LanguageSwitcher />
        </Stack>
      </Box>
    </AppBar>
  );
}

export default Header;
