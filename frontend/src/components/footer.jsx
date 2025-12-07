import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { spacing } from "../theme";
import FAQ from "../features/faq/faq";

function Footer() {
  const { t } = useTranslation();

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
          <Box
            component="img"
            src="/logo.svg"
            alt={t("footer.info")}
            sx={{
              filter: "grayscale(100%)",
              opacity: 0.7,
              width: 180,
              height: "auto",
              minWidth: "152px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
