'use client';

import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

function Title() {
  const t = useTranslations();

  console.log('Title translation:', t('header.subtitle'));

  return (
    <Box textAlign="center" color="black">
      <Typography variant="h6" sx={{ opacity: 0.9 }}>
        {t("header.subtitle")}
      </Typography>
    </Box>
  );
}

export default Title;
