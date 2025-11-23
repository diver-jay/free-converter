import { Box, Typography, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./languageSwitcher";

function Footer() {
  const { t } = useTranslation();

  return (
    <Box textAlign="center" color="black" sx={{ mt: 4 }}>
      <Stack spacing={2} alignItems="center">
        <LanguageSwitcher />
        <Box>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {t("footer.info")}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            {t("footer.poweredBy")}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default Footer;
