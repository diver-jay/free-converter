'use client';

import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { spacing, ACTION_BLUE, COMIC_INK } from "../theme";
import FAQ from "../features/faq/faq";

function Footer() {
  const t = useTranslations();

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: {
            xs: "26px 24px",
            md: "30px 88px",
          },
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          alignItems: {
            xs: "center",
            md: "flex-start",
          },
          justifyContent: "space-between",
          gap: `${spacing.lg}px`,
        }}
      >
        <Box>
          <FAQ />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: {
              xs: "center",
              md: "flex-end",
            },
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Bangers", cursive',
              fontSize: "2rem",
              color: COMIC_INK,
              textShadow: `2px 2px 0px ${ACTION_BLUE}55, 3px 3px 0px ${COMIC_INK}22`,
              letterSpacing: "2px",
            }}
          >
            OPEN CONVERT
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
            © 2025 MULTIVERSE CONVERSION PROTOCOL. ALL RIGHTS RESERVED.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
