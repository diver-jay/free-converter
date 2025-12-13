'use client';

import { Typography, Box, Paper, Alert, Chip, Stack } from "@mui/material";
import { Lock, Email, CreditCard, Speed } from "@mui/icons-material";
import BlogLayout from "@/components/BlogLayout";
import Converter from "@/features/converter/converter";
import { useTranslations } from "next-intl";

function PDFToWordBlog() {
  const t = useTranslations('blog.pdfToWord');

  return (
    <BlogLayout title={t('title')}>
      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('intro') }} />
      </Typography>

      <Paper sx={{ p: 3, bgcolor: "success.lighter", mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
          <Chip icon={<Lock />} label={t('chipNoSignup')} color="success" />
          <Chip icon={<Email />} label={t('chipNoEmail')} color="success" />
          <Chip icon={<CreditCard />} label={t('chipNoPayment')} color="success" />
          <Chip icon={<Speed />} label={t('chipUnlimited')} color="success" />
        </Stack>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <span dangerouslySetInnerHTML={{ __html: t.raw('genuinelyFree') }} />
        </Typography>
      </Paper>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        {t('whyNotFreeTitle')}
      </Typography>

      <Typography variant="body1" paragraph>
        {t('whyNotFreeDesc')}
      </Typography>

      <Typography variant="body1" component="div" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('whyNotFree1') }} />
        <br />
        <span dangerouslySetInnerHTML={{ __html: t.raw('whyNotFree2') }} />
        <br />
        <span dangerouslySetInnerHTML={{ __html: t.raw('whyNotFree3') }} />
        <br />
        <span dangerouslySetInnerHTML={{ __html: t.raw('whyNotFree4') }} />
        <br />
        <span dangerouslySetInnerHTML={{ __html: t.raw('whyNotFree5') }} />
      </Typography>

      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('whyNotFreeConclusion') }} />
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        {t('convertHereTitle')}
      </Typography>

      <Typography variant="body1" paragraph>
        {t('convertHereDesc')}
      </Typography>

      {/* EMBEDDED CONVERTER */}
      <Box sx={{ my: 4 }}>
        <Converter />
      </Box>

      <Alert severity="info" sx={{ my: 3 }}>
        <Typography variant="body2">
          <span dangerouslySetInnerHTML={{ __html: t.raw('privacyNote') }} />
        </Typography>
      </Alert>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        {t('whenNeedTitle')}
      </Typography>

      <Typography variant="body1" paragraph>
        {t('whenNeedDesc')}
      </Typography>

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        {t('useCase1Title')}
      </Typography>
      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('useCase1Desc') }} />
      </Typography>

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        {t('useCase2Title')}
      </Typography>
      <Typography variant="body1" paragraph>
        {t('useCase2Desc')}
      </Typography>

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        {t('useCase3Title')}
      </Typography>
      <Typography variant="body1" paragraph>
        {t('useCase3Desc')}
      </Typography>

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        {t('useCase4Title')}
      </Typography>
      <Typography variant="body1" paragraph>
        {t('useCase4Desc')}
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        {t('formattingTitle')}
      </Typography>

      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('formattingDesc') }} />
      </Typography>

      <Paper sx={{ p: 3, bgcolor: "background.default", mb: 3 }}>
        <Typography variant="body1" component="div">
          <span dangerouslySetInnerHTML={{ __html: t.raw('worksGreatTitle') }} />
          <ul>
            <li>{t('worksGreat1')}</li>
            <li>{t('worksGreat2')}</li>
            <li>{t('worksGreat3')}</li>
            <li>{t('worksGreat4')}</li>
          </ul>

          <span dangerouslySetInnerHTML={{ __html: t.raw('mayNeedFixTitle') }} />
          <ul>
            <li>{t('mayNeedFix1')}</li>
            <li>{t('mayNeedFix2')}</li>
            <li>{t('mayNeedFix3')}</li>
            <li>{t('mayNeedFix4')}</li>
          </ul>
        </Typography>
      </Paper>

      <Alert severity="warning" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <span dangerouslySetInnerHTML={{ __html: t.raw('formatWarning') }} />
        </Typography>
      </Alert>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        {t('compareTitle')}
      </Typography>

      <Typography variant="body1" paragraph>
        {t('compareDesc')}
      </Typography>

      <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        {t('googleDocsTitle')}
      </Typography>
      <Typography variant="body1" component="div" paragraph>
        {t('googleDocsPro1')}
        <br />
        {t('googleDocsCon1')}
        <br />
        {t('googleDocsCon2')}
        <br />
        {t('googleDocsCon3')}
      </Typography>

      <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        {t('libreOfficeTitle')}
      </Typography>
      <Typography variant="body1" component="div" paragraph>
        {t('libreOfficePro1')}
        <br />
        {t('libreOfficePro2')}
        <br />
        {t('libreOfficeCon1')}
        <br />
        {t('libreOfficeCon2')}
      </Typography>

      <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        {t('thisToolTitle')}
      </Typography>
      <Typography variant="body1" component="div" paragraph>
        {t('thisToolPro1')}
        <br />
        {t('thisToolPro2')}
        <br />
        {t('thisToolPro3')}
        <br />
        {t('thisToolPro4')}
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        {t('wordToPdfTitle')}
      </Typography>

      <Typography variant="body1" paragraph>
        {t('wordToPdfDesc')}
      </Typography>

      <Typography variant="body1" component="div" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('wordToPdfUse1') }} />
        <br />
        <span dangerouslySetInnerHTML={{ __html: t.raw('wordToPdfUse2') }} />
        <br />
        <span dangerouslySetInnerHTML={{ __html: t.raw('wordToPdfUse3') }} />
        <br />
        <span dangerouslySetInnerHTML={{ __html: t.raw('wordToPdfUse4') }} />
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

      <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        {t('faq4Q')}
      </Typography>
      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('faq4A') }} />
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        {t('bottomLineTitle')}
      </Typography>

      <Typography variant="body1" paragraph>
        {t('bottomLine1')}
      </Typography>

      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('bottomLine2') }} />
      </Typography>

      <Alert severity="success" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <span dangerouslySetInnerHTML={{ __html: t.raw('bookmarkMsg') }} />
        </Typography>
      </Alert>
    </BlogLayout>
  );
}

export default PDFToWordBlog;
