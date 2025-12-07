import { Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

function ValueCard({ icon, titleKey, descriptionKey }) {
  const { t } = useTranslation();

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
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {t(titleKey)}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ textAlign: "justify" }}>
        {t(descriptionKey)}
      </Typography>
    </Box>
  );
}

export default ValueCard;
