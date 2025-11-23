import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { spacing } from "../theme";

function Footer() {
  const { t } = useTranslation();

  return (
    <Box
      textAlign="center"
      color="black"
      sx={{ mt: `${spacing.xl}px` }}
    >
      <Typography variant="body2" sx={{ opacity: 0.9 }}>
        {t("footer.info")}
      </Typography>
      <Typography variant="caption" sx={{ opacity: 0.8 }}>
        {t("footer.poweredBy")}
      </Typography>
    </Box>
  );
}

export default Footer;
