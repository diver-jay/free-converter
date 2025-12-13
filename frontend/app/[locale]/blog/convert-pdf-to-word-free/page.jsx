import PDFToWordBlog from '../posts/PDFToWordBlog';

export const metadata = {
  title:
    'Convert PDF to Word for Free: No Sign-up, No Email Required | Open Convert',
  description:
    'Convert PDF to editable Word documents instantly. 100% free, unlimited conversions, no registration, no watermarks. Works in your browser.',
  keywords:
    'PDF to Word converter, free PDF converter, convert PDF to DOCX, PDF to Word online, no sign-up converter, unlimited PDF conversion',
  alternates: {
    canonical: 'https://www.open-convert.com/blog/convert-pdf-to-word-free',
  },
  openGraph: {
    type: 'article',
    title: 'Convert PDF to Word for Free: No Sign-up, No Email Required',
    description:
      'Convert PDF to editable Word documents instantly. 100% free, unlimited conversions, no registration, no watermarks. Works in your browser.',
    url: 'https://www.open-convert.com/blog/convert-pdf-to-word-free',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convert PDF to Word for Free: No Sign-up, No Email Required',
    description:
      'Convert PDF to editable Word documents instantly. 100% free, unlimited conversions, no registration, no watermarks. Works in your browser.',
  },
};

export default function Page() {
  return <PDFToWordBlog />;
}
