"use client";

import { NextIntlClientProvider } from 'next-intl';
import ThemeRegistry from '../ThemeRegistry';

export default function Providers({ locale, messages, children }) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeRegistry>{children}</ThemeRegistry>
    </NextIntlClientProvider>
  );
}
