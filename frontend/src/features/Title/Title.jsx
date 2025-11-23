import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function Title() {
  const { t } = useTranslation();

  return (
    <Box textAlign="center" color="black">
      <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
        {t("header.title")}
      </Typography>
      <Typography variant="h6" sx={{ opacity: 0.9 }}>
        {t("header.subtitle")}
      </Typography>
    </Box>
  );
}

export default Title;
