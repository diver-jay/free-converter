'use client';

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Box,
  Typography,
  Collapse,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { spacing } from "../../theme";

function FAQ() {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Box
        onClick={toggleFAQ}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          cursor: "pointer",
          mb: isOpen ? `${spacing.md}px` : 0,
          transition: "all 0.3s",
          "&:hover": {
            opacity: 0.8,
          },
          width: {
            xs: "320px",
            md: "424px",
          },
        }}
      >
        <Typography variant="body2" fontWeight="bold">
          {t("faq.title")}
        </Typography>
        <ExpandMore
          sx={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }}
        />
      </Box>

      <Collapse in={isOpen}>
        <Grid
          container
          spacing={2}
          sx={{ width: { xs: "320px", md: "440px" } }}
        >
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="body2" fontWeight={600}>
                  {t("faq.q1")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {t("faq.a1")}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="body2" fontWeight={600}>
                  {t("faq.q2")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {t("faq.a2")}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="body2" fontWeight={600}>
                  {t("faq.q3")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {t("faq.a3")}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="body2" fontWeight={600}>
                  {t("faq.q4")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {t("faq.a4")}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="body2" fontWeight={600}>
                  {t("faq.q5")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {t("faq.a5")}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
}

export default FAQ;
