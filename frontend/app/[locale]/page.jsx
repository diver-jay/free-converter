import { Stack } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import Converter from '@/features/converter/converter';
import Title from '@/features/title/title';
import Values from '@/features/values/values';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  // Locale mapping for Open Graph
  const localeMap = {
    en: 'en_US',
    ko: 'ko_KR',
    zh: 'zh_CN',
  };

  const alternateLocales = Object.entries(localeMap)
    .filter(([key]) => key !== locale)
    .map(([, value]) => value);

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: `https://www.open-convert.com/${locale}`,
      images: [
        {
          url: 'https://www.open-convert.com/og-image.jpg',
          alt: 'Open Convert',
        },
      ],
      locale: localeMap[locale],
      alternateLocale: alternateLocales,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['https://www.open-convert.com/og-image.jpg'],
    },
  };
}

export default function Home() {
  return (
    <Stack spacing={3}>
      <Title />
      <Converter />
      <Values />
    </Stack>
  );
}
