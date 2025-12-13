import ATSResumeBlog from '../posts/ATSResumeBlog';

export const metadata = {
  title:
    'Submit resume in PDF or Word? Why format matters for ATS | Open Convert',
  description:
    'Learn which resume format (PDF vs Word) passes Applicant Tracking Systems better and avoid common resume rejection mistakes.',
  keywords:
    'resume format, ATS resume, PDF vs Word resume, applicant tracking system, resume rejection, job application tips',
  alternates: {
    canonical: 'https://www.open-convert.com/blog/resume-pdf-word-ats',
  },
  openGraph: {
    type: 'article',
    title: 'Submit resume in PDF or Word? Why format matters for ATS',
    description:
      'Learn which resume format (PDF vs Word) passes Applicant Tracking Systems better and avoid common resume rejection mistakes.',
    url: 'https://www.open-convert.com/blog/resume-pdf-word-ats',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Submit resume in PDF or Word? Why format matters for ATS',
    description:
      'Learn which resume format (PDF vs Word) passes Applicant Tracking Systems better and avoid common resume rejection mistakes.',
  },
};

export default function Page() {
  return <ATSResumeBlog />;
}
