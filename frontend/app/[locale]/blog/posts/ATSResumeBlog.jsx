'use client';

import { Typography, Box, Paper, Alert } from "@mui/material";
import BlogLayout from "@/components/BlogLayout";
import Converter from "@/features/converter/converter";

function ATSResumeBlog() {
  return (
    <BlogLayout title="Submit resume in PDF or Word? Why format matters for ATS">
      <Typography variant="body1" paragraph>
        You've spent hours perfecting your resume, but did you know that <strong>over 75% of resumes are rejected before a human ever sees them</strong>? The culprit? Applicant Tracking Systems (ATS) - and the wrong file format can be your downfall.
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        The ATS Problem: Why Your Resume Gets Lost
      </Typography>

      <Typography variant="body1" paragraph>
        Applicant Tracking Systems scan your resume to extract information like your name, experience, and skills. Here's the catch: <strong>not all file formats are created equal</strong> when it comes to ATS compatibility.
      </Typography>

      <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
        PDF vs Word: The Verdict
      </Typography>

      <Paper sx={{ p: 3, bgcolor: "primary.lighter", mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Quick Answer:
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Word (.docx) is generally SAFER for ATS systems</strong> - but with important exceptions.
        </Typography>
        <Typography variant="body2">
          • <strong>Use Word (.docx)</strong> when the job posting doesn't specify a format
          <br />
          • <strong>Use PDF</strong> when explicitly requested or when preserving exact formatting is critical
        </Typography>
      </Paper>

      <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
        Why Word (.docx) Works Better for ATS
      </Typography>

      <Typography variant="body1" component="div">
        <strong>1. Text Extraction is Easier</strong>
        <br />
        Word documents store text as plain, structured data. ATS systems can easily parse:
        <ul>
          <li>Headings and sections</li>
          <li>Bullet points and lists</li>
          <li>Tables and formatting</li>
        </ul>
      </Typography>

      <Typography variant="body1" component="div" paragraph>
        <strong>2. Universal Compatibility</strong>
        <br />
        Almost all ATS systems (Workday, Taleo, Greenhouse, Lever) can read .docx files without issues.
      </Typography>

      <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
        When PDFs Fail (And How to Fix It)
      </Typography>

      <Typography variant="body1" paragraph>
        PDFs can be problematic because:
      </Typography>

      <Alert severity="warning" sx={{ mb: 2 }}>
        <Typography variant="body2">
          <strong>Image-based PDFs</strong> (scanned documents) are completely unreadable by ATS. Your resume will be auto-rejected.
        </Typography>
      </Alert>

      <Typography variant="body1" component="div" paragraph>
        <strong>Common PDF Problems:</strong>
        <ul>
          <li>Text in headers/footers may be ignored</li>
          <li>Multi-column layouts confuse parsers</li>
          <li>Tables can scramble your information</li>
          <li>Custom fonts may not render correctly</li>
        </ul>
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        Need to Convert? Do It Here (Free, No Sign-up)
      </Typography>

      <Typography variant="body1" paragraph>
        If you have your resume in the wrong format, <strong>don't panic</strong>. Convert it right here in seconds:
      </Typography>

      {/* EMBEDDED CONVERTER - This is the KEY to SEO strategy */}
      <Box sx={{ my: 4 }}>
        <Converter />
      </Box>

      <Alert severity="info" sx={{ my: 3 }}>
        <Typography variant="body2">
          <strong>Pro Tip:</strong> After converting, always open the file and check that your formatting stayed intact. Look for missing bullet points, scrambled dates, or misaligned sections.
        </Typography>
      </Alert>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        The Safe Strategy: Submit Both (When Possible)
      </Typography>

      <Typography variant="body1" paragraph>
        If the application system allows multiple file uploads:
      </Typography>

      <Typography variant="body1" component="div" paragraph>
        <strong>1. Upload .docx as your primary resume</strong> (for ATS parsing)
        <br />
        <strong>2. Upload PDF as a "backup" or in the cover letter section</strong> (for human reviewers who want clean formatting)
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        Final Checklist: ATS-Proof Your Resume
      </Typography>

      <Paper sx={{ p: 3, bgcolor: "background.default" }}>
        <Typography variant="body1" component="div">
          ✅ <strong>File Format:</strong> Use .docx unless PDF is explicitly requested
          <br />
          ✅ <strong>File Name:</strong> Use "FirstName_LastName_Resume.docx" (not "resume_final_v3.docx")
          <br />
          ✅ <strong>Fonts:</strong> Stick to standard fonts (Arial, Calibri, Times New Roman)
          <br />
          ✅ <strong>Layout:</strong> Single column, clear headings, no text boxes or images
          <br />
          ✅ <strong>Keywords:</strong> Match job description terminology exactly
          <br />
          ✅ <strong>Test It:</strong> Open your file in Google Docs to see if text is selectable
        </Typography>
      </Paper>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        What If They Specifically Ask for PDF?
      </Typography>

      <Typography variant="body1" paragraph>
        Some companies (especially in creative fields like design, marketing, or tech startups) <strong>prefer PDFs</strong> because:
      </Typography>

      <Typography variant="body1" component="div" paragraph>
        • They want to see your exact formatting and design choices
        <br />
        • They're using modern ATS systems that handle PDFs well
        <br />
        • They value brand presentation and visual consistency
      </Typography>

      <Typography variant="body1" paragraph>
        <strong>In this case:</strong> Always follow their instructions. If they ask for PDF, give them PDF. Use the converter above to switch from Word to PDF if needed.
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        Common Questions
      </Typography>

      <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        Q: Can I use Google Docs format?
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>A:</strong> No. Always export to .docx or PDF before submitting. Many ATS systems cannot open Google Docs links or .gdoc files.
      </Typography>

      <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        Q: What about Pages files (.pages) from Mac?
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>A:</strong> Never submit .pages files. They're only readable on Mac/iOS. Export to .docx or PDF first.
      </Typography>

      <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        Q: Should I password-protect my resume PDF?
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>A:</strong> Absolutely not. ATS systems cannot open password-protected files. Your application will be auto-rejected.
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        The Bottom Line
      </Typography>

      <Typography variant="body1" paragraph>
        <strong>Default to Word (.docx) for maximum ATS compatibility</strong>, but always read the job posting instructions carefully. When in doubt, you can't go wrong with a clean, simple .docx file with standard fonts and single-column layout.
      </Typography>

      <Typography variant="body1" paragraph>
        And remember: the converter above is always here, completely free, no email required. Convert as many times as you need until you get it right.
      </Typography>

      <Alert severity="success" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Good luck with your job search!</strong> The right format is just one piece of the puzzle, but it's an important one that many candidates overlook.
        </Typography>
      </Alert>
    </BlogLayout>
  );
}

export default ATSResumeBlog;
