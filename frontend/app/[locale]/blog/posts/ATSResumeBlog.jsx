'use client';

import { Typography, Box, Paper, Alert } from "@mui/material";
import BlogLayout from "@/components/BlogLayout";
import Converter from "@/features/converter/converter";
import { useTranslations } from "next-intl";

function ATSResumeBlog() {
  const t = useTranslations('blog.atsResume');

  return (
    <BlogLayout title={t('title')}>
      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('intro') }} />
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        {t('atsProblemTitle')}
      </Typography>

      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('atsProblemDesc') }} />
      </Typography>

      <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
        {t('pdfVsWordTitle')}
      </Typography>

      <Paper sx={{ p: 3, bgcolor: "primary.lighter", mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          {t('quickAnswerTitle')}
        </Typography>
        <Typography variant="body1" paragraph>
          <span dangerouslySetInnerHTML={{ __html: t.raw('quickAnswerDesc') }} />
        </Typography>
        <Typography variant="body2">
          <span dangerouslySetInnerHTML={{ __html: t.raw('quickAnswerBullet1') }} />
          <br />
          <span dangerouslySetInnerHTML={{ __html: t.raw('quickAnswerBullet2') }} />
        </Typography>
      </Paper>

      <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
        {t('whyWordTitle')}
      </Typography>

      <Typography variant="body1" component="div">
        <span dangerouslySetInnerHTML={{ __html: t.raw('whyWordPoint1Title') }} />
        <br />
        <span dangerouslySetInnerHTML={{ __html: t.raw('whyWordPoint1Desc') }} />
        <ul>
          <li>{t('whyWordPoint1Item1')}</li>
          <li>{t('whyWordPoint1Item2')}</li>
          <li>{t('whyWordPoint1Item3')}</li>
        </ul>
      </Typography>

      <Typography variant="body1" component="div" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('whyWordPoint2Title') }} />
        <br />
        {t('whyWordPoint2Desc')}
      </Typography>

      <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
        {t('whenPdfFailTitle')}
      </Typography>

      <Typography variant="body1" paragraph>
        {t('whenPdfFailDesc')}
      </Typography>

      <Alert severity="warning" sx={{ mb: 2 }}>
        <Typography variant="body2">
          <span dangerouslySetInnerHTML={{ __html: t.raw('pdfWarning') }} />
        </Typography>
      </Alert>

      <Typography variant="body1" component="div" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('pdfProblemsTitle') }} />
        <ul>
          <li>{t('pdfProblem1')}</li>
          <li>{t('pdfProblem2')}</li>
          <li>{t('pdfProblem3')}</li>
          <li>{t('pdfProblem4')}</li>
        </ul>
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        {t('convertTitle')}
      </Typography>

      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('convertDesc') }} />
      </Typography>

      {/* EMBEDDED CONVERTER - This is the KEY to SEO strategy */}
      <Box sx={{ my: 4 }}>
        <Converter />
      </Box>

      <Alert severity="info" sx={{ my: 3 }}>
        <Typography variant="body2">
          <span dangerouslySetInnerHTML={{ __html: t.raw('proTip') }} />
        </Typography>
      </Alert>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        {t('safeStrategyTitle')}
      </Typography>

      <Typography variant="body1" paragraph>
        {t('safeStrategyDesc')}
      </Typography>

      <Typography variant="body1" component="div" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('safeStrategy1') }} />
        <br />
        <span dangerouslySetInnerHTML={{ __html: t.raw('safeStrategy2') }} />
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        {t('checklistTitle')}
      </Typography>

      <Paper sx={{ p: 3, bgcolor: "background.default" }}>
        <Typography variant="body1" component="div">
          <span dangerouslySetInnerHTML={{ __html: t.raw('checklist1') }} />
          <br />
          <span dangerouslySetInnerHTML={{ __html: t.raw('checklist2') }} />
          <br />
          <span dangerouslySetInnerHTML={{ __html: t.raw('checklist3') }} />
          <br />
          <span dangerouslySetInnerHTML={{ __html: t.raw('checklist4') }} />
          <br />
          <span dangerouslySetInnerHTML={{ __html: t.raw('checklist5') }} />
          <br />
          <span dangerouslySetInnerHTML={{ __html: t.raw('checklist6') }} />
        </Typography>
      </Paper>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        {t('specificPdfTitle')}
      </Typography>

      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('specificPdfDesc') }} />
      </Typography>

      <Typography variant="body1" component="div" paragraph>
        {t('specificPdfReason1')}
        <br />
        {t('specificPdfReason2')}
        <br />
        {t('specificPdfReason3')}
      </Typography>

      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('specificPdfInstructions') }} />
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        {t('faqTitle')}
      </Typography>

      <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        {t('faq1Q')}
      </Typography>
      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('faq1A') }} />
      </Typography>

      <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        {t('faq2Q')}
      </Typography>
      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('faq2A') }} />
      </Typography>

      <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        {t('faq3Q')}
      </Typography>
      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('faq3A') }} />
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        {t('bottomLineTitle')}
      </Typography>

      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('bottomLine1') }} />
      </Typography>

      <Typography variant="body1" paragraph>
        {t('bottomLine2')}
      </Typography>

      <Alert severity="success" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <span dangerouslySetInnerHTML={{ __html: t.raw('goodLuck') }} />
        </Typography>
      </Alert>
    </BlogLayout>
  );
}

export default ATSResumeBlog;
