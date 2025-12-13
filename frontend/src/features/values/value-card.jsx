'use client';

import { Typography, Box } from "@mui/material";
import { useTranslations } from "next-intl";

function ValueCard({ icon, titleKey, descriptionKey }) {
  const t = useTranslations();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        height: "100%",
      }}
    >
      <Box sx={{ mb: 2, color: "primary.main" }}>{icon}</Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {t(titleKey)}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: "justify" }}
      >
        {t(descriptionKey)}
      </Typography>
    </Box>
  );
}

export default ValueCard;
