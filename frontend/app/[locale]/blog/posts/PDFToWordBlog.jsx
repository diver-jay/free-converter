'use client';

import { Typography, Box, Paper, Alert, Chip, Stack } from "@mui/material";
import { Lock, Email, CreditCard, Speed } from "@mui/icons-material";
import BlogLayout from "@/components/BlogLayout";
import Converter from "@/features/converter/converter";

function PDFToWordBlog() {
  return (
    <BlogLayout title="Convert PDF to Word for Free: No Sign-up, No Email Required">
      <Typography variant="body1" paragraph>
        Need to edit a PDF but stuck because it's locked? Want to convert PDF to Word but <strong>sick of sites asking for your email, credit card, or "free trial"</strong>? You're in the right place.
      </Typography>

      <Paper sx={{ p: 3, bgcolor: "success.lighter", mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
          <Chip icon={<Lock />} label="No Sign-up" color="success" />
          <Chip icon={<Email />} label="No Email" color="success" />
          <Chip icon={<CreditCard />} label="No Payment" color="success" />
          <Chip icon={<Speed />} label="Unlimited" color="success" />
        </Stack>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>This tool is genuinely 100% free.</strong> No hidden costs, no daily limits, no watermarks, no BS.
        </Typography>
      </Paper>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        Why Most "Free" PDF Converters Aren't Actually Free
      </Typography>

      <Typography variant="body1" paragraph>
        Let's be honest: the internet is full of "free" PDF converters that pull this nonsense:
      </Typography>

      <Typography variant="body1" component="div" paragraph>
        ❌ <strong>"Free trial"</strong> that auto-charges your card after 7 days
        <br />
        ❌ <strong>"Enter your email"</strong> to unlock your file (and get spammed forever)
        <br />
        ❌ <strong>2 conversions per day limit</strong> unless you upgrade to "Pro"
        <br />
        ❌ <strong>Watermarks plastered</strong> all over your converted document
        <br />
        ❌ <strong>File size limits</strong> like "max 5MB" (useless for real documents)
      </Typography>

      <Typography variant="body1" paragraph>
        This is why people end up paying $15/month for Adobe Acrobat just to convert a single PDF. <strong>It doesn't have to be this way.</strong>
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        Convert PDF to Word Right Here (Seriously Free)
      </Typography>

      <Typography variant="body1" paragraph>
        No catch. No tricks. Just drag your PDF below and convert it:
      </Typography>

      {/* EMBEDDED CONVERTER */}
      <Box sx={{ my: 4 }}>
        <Converter />
      </Box>

      <Alert severity="info" sx={{ my: 3 }}>
        <Typography variant="body2">
          <strong>Your file is automatically deleted after 1 hour</strong> for privacy. We don't store, track, or share your documents. Period.
        </Typography>
      </Alert>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        When Do You Need to Convert PDF to Word?
      </Typography>

      <Typography variant="body1" paragraph>
        Here are the most common reasons people convert PDFs to Word (and why this tool exists):
      </Typography>

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        1. Editing Contracts or Agreements
      </Typography>
      <Typography variant="body1" paragraph>
        Someone sent you a contract as PDF, but you need to change a few clauses before signing. <strong>Converting to Word lets you edit</strong> without expensive software.
      </Typography>

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        2. Updating Your Resume
      </Typography>
      <Typography variant="body1" paragraph>
        Your resume is in PDF format, but you need to add your new job or update a skill. Word makes editing much easier than dealing with PDF editors.
      </Typography>

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        3. Extracting Text from Scanned Documents
      </Typography>
      <Typography variant="body1" paragraph>
        Got a scanned PDF (like a printed form or old document)? Converting to Word can help extract the text - though results vary depending on scan quality.
      </Typography>

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        4. Reusing Content from Reports or Papers
      </Typography>
      <Typography variant="body1" paragraph>
        Need to copy sections from a research paper, report, or whitepaper? Word format makes it easy to grab text, images, and tables without formatting headaches.
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        Will My Formatting Stay Intact?
      </Typography>

      <Typography variant="body1" paragraph>
        <strong>Mostly, yes</strong> - but it depends on how complex your PDF is:
      </Typography>

      <Paper sx={{ p: 3, bgcolor: "background.default", mb: 3 }}>
        <Typography variant="body1" component="div">
          <strong>✅ Works Great For:</strong>
          <ul>
            <li>Standard text documents (reports, essays, letters)</li>
            <li>Simple tables and bullet points</li>
            <li>Basic images embedded in text</li>
            <li>Single or double-column layouts</li>
          </ul>

          <strong>⚠️ May Need Manual Fixes:</strong>
          <ul>
            <li>Complex multi-column magazine layouts</li>
            <li>Documents with lots of text boxes or shapes</li>
            <li>Scanned PDFs (image-based, not searchable text)</li>
            <li>Forms with fillable fields</li>
          </ul>
        </Typography>
      </Paper>

      <Alert severity="warning" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Pro Tip:</strong> After converting, always open the Word file and check for formatting issues. Look for missing images, scrambled tables, or misaligned text. Most documents convert perfectly, but complex layouts may need minor tweaks.
        </Typography>
      </Alert>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        How Does This Differ from Google Docs or LibreOffice?
      </Typography>

      <Typography variant="body1" paragraph>
        Good question. Here's the comparison:
      </Typography>

      <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        Google Docs:
      </Typography>
      <Typography variant="body1" component="div" paragraph>
        • ✅ Free and no install
        <br />
        • ❌ Uploads to your Google Drive (privacy concern for sensitive docs)
        <br />
        • ❌ Formatting often gets mangled worse than dedicated converters
        <br />
        • ❌ Requires a Google account
      </Typography>

      <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        LibreOffice (Desktop App):
      </Typography>
      <Typography variant="body1" component="div" paragraph>
        • ✅ Completely free and open-source
        <br />
        • ✅ Good conversion quality
        <br />
        • ❌ Requires downloading and installing software
        <br />
        • ❌ Slower for quick one-off conversions
      </Typography>

      <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        This Tool:
      </Typography>
      <Typography variant="body1" component="div" paragraph>
        • ✅ No sign-up, no email, no install
        <br />
        • ✅ Files auto-deleted after 1 hour (privacy)
        <br />
        • ✅ Fast web-based conversion using LibreOffice backend
        <br />
        • ✅ Unlimited use, no watermarks
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        What About Converting Word to PDF?
      </Typography>

      <Typography variant="body1" paragraph>
        Yep, this tool does that too! Just upload a .docx file and select PDF as the output format. Use cases:
      </Typography>

      <Typography variant="body1" component="div" paragraph>
        • <strong>Job applications:</strong> Many companies want PDFs to preserve formatting
        <br />
        • <strong>Printing:</strong> PDFs print exactly as they appear on screen
        <br />
        • <strong>Sharing:</strong> PDFs are universally readable (no compatibility issues)
        <br />
        • <strong>Security:</strong> PDFs are harder to accidentally edit
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        Common Questions
      </Typography>

      <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        Q: Is there a file size limit?
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>A:</strong> Currently no hard limit, but very large files (100MB+) may take longer to convert. For best results, keep files under 100MB.
      </Typography>

      <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        Q: Can I convert password-protected PDFs?
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>A:</strong> No. You must unlock the PDF first (you'll need the password). This is for security reasons - we can't bypass PDF encryption.
      </Typography>

      <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        Q: What file formats are supported besides PDF and Word?
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>A:</strong> This tool also converts video files (MP4, WebM, MOV, AVI, MKV, FLV). Check the homepage for all supported formats.
      </Typography>

      <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
        Q: Why is this free? What's the catch?
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>A:</strong> No catch. This project uses open-source tools (LibreOffice for conversion) and is supported by users who appreciate ad-free, privacy-respecting tools. If it's useful to you, that's enough.
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        The Bottom Line
      </Typography>

      <Typography variant="body1" paragraph>
        You don't need Adobe Acrobat. You don't need to sign up for shady "free trials." You don't need to give your email to yet another website.
      </Typography>

      <Typography variant="body1" paragraph>
        <strong>Just drag your PDF, convert it, and get on with your life.</strong> That's it.
      </Typography>

      <Alert severity="success" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Bookmark this page</strong> if you found it useful. Next time you need to convert a PDF, you'll know exactly where to go.
        </Typography>
      </Alert>
    </BlogLayout>
  );
}

export default PDFToWordBlog;
