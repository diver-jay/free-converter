import { useTranslation } from "react-i18next";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { HelpOutline, ExpandMore } from "@mui/icons-material";

function FAQ() {
  const { t } = useTranslation();

  return (
    <Card elevation={4}>
      <CardContent sx={{ p: 4 }}>
        <Stack spacing={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <HelpOutline color="primary" />
            <Typography variant="h5" fontWeight="bold">
              {t("faq.title")}
            </Typography>
          </Box>
          <Divider />
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight={600}>{t("faq.q1")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{t("faq.a1")}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight={600}>{t("faq.q2")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{t("faq.a2")}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight={600}>{t("faq.q3")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{t("faq.a3")}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight={600}>{t("faq.q4")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{t("faq.a4")}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight={600}>{t("faq.q5")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{t("faq.a5")}</Typography>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default FAQ;
