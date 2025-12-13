'use client';

import {
  Typography,
  Box,
  Paper,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
} from "@mui/material";
import { Warning, CheckCircle, Error } from "@mui/icons-material";
import BlogLayout from "@/components/BlogLayout";
import Converter from "@/features/converter/converter";
import { useTranslations } from "next-intl";

function IPhoneVideoBlog() {
  const t = useTranslations('blog.iPhoneVideo');

  return (
    <BlogLayout title={t('title')}>
      <Alert severity="error" icon={<Error />} sx={{ mb: 3 }}>
        <Typography variant="body1">
          <span dangerouslySetInnerHTML={{ __html: t.raw('alertTitle') }} />
        </Typography>
      </Alert>

      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('intro') }} />
      </Typography>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mt: 4, fontWeight: 600 }}
      >
        {t('problemTitle')}
      </Typography>

      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('problemDesc') }} />
      </Typography>

      <Typography variant="body1" component="div" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('problemPoint1') }} />
        <br /><span dangerouslySetInnerHTML={{ __html: t.raw('problemPoint2') }} />
        <br /><span dangerouslySetInnerHTML={{ __html: t.raw('problemPoint3') }} />
        <br /><span dangerouslySetInnerHTML={{ __html: t.raw('problemPoint4') }} />
        <br /><span dangerouslySetInnerHTML={{ __html: t.raw('problemPoint5') }} />
      </Typography>

      <Paper sx={{ p: 3, bgcolor: "warning.lighter", mb: 3 }}>
        <Stack direction="row" spacing={1} alignItems="flex-start">
          <Warning color="warning" />
          <Box>
            <Typography variant="body1">
              <span dangerouslySetInnerHTML={{ __html: t.raw('whyAppleTitle') }} />
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mt: 4, fontWeight: 600 }}
      >
        {t('symptomsTitle')}
      </Typography>

      <Typography variant="body1" component="div">
        {t('symptomsDesc')}
        <ul>
          <li>
            <span dangerouslySetInnerHTML={{ __html: t.raw('symptom1') }} />
          </li>
          <li>
            <span dangerouslySetInnerHTML={{ __html: t.raw('symptom2') }} />
          </li>
          <li>
            <span dangerouslySetInnerHTML={{ __html: t.raw('symptom3') }} />
          </li>
          <li>
            <span dangerouslySetInnerHTML={{ __html: t.raw('symptom4') }} />
          </li>
          <li>
            <span dangerouslySetInnerHTML={{ __html: t.raw('symptom5') }} />
          </li>
          <li>
            {t('symptom6')}
          </li>
        </ul>
      </Typography>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mt: 4, fontWeight: 600 }}
      >
        {t('officialFixTitle')}
      </Typography>

      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('officialFixDesc') }} />
      </Typography>

      <Typography variant="body1" component="div" paragraph>
        {t('officialFixStep1')}
        <br />
        <span dangerouslySetInnerHTML={{ __html: t.raw('officialFixStep2') }} />
        <br />
        {t('officialFixStep3')}
        <br />
        {t('officialFixStep4')}
      </Typography>

      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('whySucksTitle') }} />
      </Typography>

      <Typography variant="body1" component="div" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('whySucksPoint1') }} />
        <br />
        {t('whySucksPoint2')}
        <br />
        {t('whySucksPoint3')}
        <br />{t('whySucksPoint4')}
      </Typography>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mt: 4, fontWeight: 600 }}
      >
        {t('realFixTitle')}
      </Typography>

      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('realFixDesc') }} />
      </Typography>

      <Paper sx={{ p: 3, bgcolor: "success.lighter", mb: 3 }}>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <CheckCircle color="success" sx={{ fontSize: 20 }} />
            <Typography variant="body1">
              <span dangerouslySetInnerHTML={{ __html: t.raw('benefit1') }} />
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <CheckCircle color="success" sx={{ fontSize: 20 }} />
            <Typography variant="body1">
              <span dangerouslySetInnerHTML={{ __html: t.raw('benefit2') }} />
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <CheckCircle color="success" sx={{ fontSize: 20 }} />
            <Typography variant="body1">
              <span dangerouslySetInnerHTML={{ __html: t.raw('benefit3') }} />
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <CheckCircle color="success" sx={{ fontSize: 20 }} />
            <Typography variant="body1">
              <span dangerouslySetInnerHTML={{ __html: t.raw('benefit4') }} />
            </Typography>
          </Stack>
        </Stack>
      </Paper>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mt: 4, fontWeight: 600 }}
      >
        {t('convertHereTitle')}
      </Typography>

      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('convertHereDesc') }} />
      </Typography>

      {/* EMBEDDED CONVERTER - THE MONEY SHOT */}
      <Box sx={{ my: 4 }}>
        <Converter />
      </Box>

      <Alert severity="info" sx={{ my: 3 }}>
        <Typography variant="body2">
          <span dangerouslySetInnerHTML={{ __html: t.raw('technicalNote') }} />
        </Typography>
      </Alert>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mt: 4, fontWeight: 600 }}
      >
        {t('preventTitle')}
      </Typography>

      <Typography variant="body1" paragraph>
        {t('preventDesc')}
      </Typography>

      <Paper sx={{ p: 3, bgcolor: "background.default" }}>
        <Typography variant="body1" component="div">
          <span dangerouslySetInnerHTML={{ __html: t.raw('preventStepsTitle') }} />
          <br />
          <span dangerouslySetInnerHTML={{ __html: t.raw('preventStep1') }} />
          <br />
          <span dangerouslySetInnerHTML={{ __html: t.raw('preventStep2') }} />
          <br />
          <span dangerouslySetInnerHTML={{ __html: t.raw('preventStep3') }} />
          <br />
          <span dangerouslySetInnerHTML={{ __html: t.raw('preventStep4') }} />
        </Typography>
      </Paper>

      <Typography variant="body1" paragraph sx={{ mt: 2 }}>
        <span dangerouslySetInnerHTML={{ __html: t.raw('whatThisDoes') }} />
      </Typography>

      <Alert severity="warning" sx={{ mt: 2 }}>
        <Typography variant="body2">
          <span dangerouslySetInnerHTML={{ __html: t.raw('tradeoffWarning') }} />
        </Typography>
      </Alert>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mt: 4, fontWeight: 600 }}
      >
        {t('comparisonTitle')}
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "primary.main" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                {t('tableHeaderPlatform')}
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                {t('tableHeaderHEVC')}
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                {t('tableHeaderH264')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{t('tableWindows')}</TableCell>
              <TableCell sx={{ color: "error.main", fontWeight: "bold" }}>
                {t('tableNo')}
              </TableCell>
              <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
                {t('tableYes')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('tableMac')}</TableCell>
              <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
                {t('tableYes')}
              </TableCell>
              <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
                {t('tableYes')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('tableAndroid')}</TableCell>
              <TableCell sx={{ color: "warning.main", fontWeight: "bold" }}>
                {t('tableMaybe')}
              </TableCell>
              <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
                {t('tableYes')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('tablePremiere')}</TableCell>
              <TableCell sx={{ color: "warning.main", fontWeight: "bold" }}>
                {t('tableSlow')}
              </TableCell>
              <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
                {t('tableYes')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('tableDavinci')}</TableCell>
              <TableCell sx={{ color: "error.main", fontWeight: "bold" }}>
                {t('tableNo')}
              </TableCell>
              <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
                {t('tableYes')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('tableVLC')}</TableCell>
              <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
                {t('tableYes')}
              </TableCell>
              <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
                {t('tableYes')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('tableSocial')}</TableCell>
              <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
                {t('tableYes')}
              </TableCell>
              <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
                {t('tableYes')}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mt: 4, fontWeight: 600 }}
      >
        {t('commonQTitle')}
      </Typography>

      <Typography
        variant="h6"
        component="h4"
        gutterBottom
        sx={{ mt: 2, fontWeight: 600 }}
      >
        {t('commonQ1')}
      </Typography>
      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('commonA1') }} />
      </Typography>

      <Typography
        variant="h6"
        component="h4"
        gutterBottom
        sx={{ mt: 2, fontWeight: 600 }}
      >
        {t('commonQ2')}
      </Typography>
      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('commonA2') }} />
      </Typography>

      <Typography
        variant="h6"
        component="h4"
        gutterBottom
        sx={{ mt: 2, fontWeight: 600 }}
      >
        {t('commonQ3')}
      </Typography>
      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('commonA3') }} />
      </Typography>

      <Typography
        variant="h6"
        component="h4"
        gutterBottom
        sx={{ mt: 2, fontWeight: 600 }}
      >
        {t('commonQ4')}
      </Typography>
      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('commonA4') }} />
      </Typography>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mt: 4, fontWeight: 600 }}
      >
        {t('bottomLineTitle')}
      </Typography>

      <Typography variant="body1" paragraph>
        {t('bottomLine1')}
      </Typography>

      <Typography variant="body1" paragraph>
        <span dangerouslySetInnerHTML={{ __html: t.raw('bottomLine2') }} />
      </Typography>

      <Typography variant="body1" paragraph>
        {t('bottomLine3')}
      </Typography>

      <Alert severity="success" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <span dangerouslySetInnerHTML={{ __html: t.raw('problemSolved') }} />
        </Typography>
      </Alert>
    </BlogLayout>
  );
}

export default IPhoneVideoBlog;
