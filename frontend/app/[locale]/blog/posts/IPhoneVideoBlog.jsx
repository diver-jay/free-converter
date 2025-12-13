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

function IPhoneVideoBlog() {
  return (
    <BlogLayout title="Why your iPhone video (HEVC/MOV) won't play on Windows & How to fix it">
      <Alert severity="error" icon={<Error />} sx={{ mb: 3 }}>
        <Typography variant="body1">
          <strong>Frustrated?</strong> You just shot a perfect video on your
          iPhone, transferred it to your Windows PC, and...{" "}
          <strong>it won't play</strong>. The file is there, but Windows Media
          Player shows a black screen or error message.
        </Typography>
      </Alert>

      <Typography variant="body1" paragraph>
        You're not alone. This is{" "}
        <strong>one of the most common tech frustrations</strong> for iPhone
        users, and it's not your fault. Here's what's happening and how to fix
        it permanently.
      </Typography>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mt: 4, fontWeight: 600 }}
      >
        The Problem: HEVC (aka H.265) Codec
      </Typography>

      <Typography variant="body1" paragraph>
        Since iOS 11 (2017), iPhones record videos using{" "}
        <strong>HEVC (High Efficiency Video Coding)</strong>, also called H.265.
        This codec:
      </Typography>

      <Typography variant="body1" component="div" paragraph>
        ✅ <strong>Saves 50% storage space</strong> compared to older formats
        <br />✅ <strong>Keeps the same video quality</strong>
        <br />❌ <strong>Isn't supported by most Windows apps</strong>
        <br />❌ <strong>Doesn't work on older Android phones</strong>
        <br />❌ <strong>Crashes many video editing programs</strong> (Adobe
        Premiere, DaVinci Resolve, etc.)
      </Typography>

      <Paper sx={{ p: 3, bgcolor: "warning.lighter", mb: 3 }}>
        <Stack direction="row" spacing={1} alignItems="flex-start">
          <Warning color="warning" />
          <Box>
            <Typography variant="body1">
              <strong>Why Apple does this:</strong> HEVC is technically superior
              - smaller files, better quality. But it's patent-encumbered, so
              Microsoft and Google don't include native support in
              Windows/Android to avoid licensing fees.
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
        Symptoms: How to Know If This Is Your Problem
      </Typography>

      <Typography variant="body1" component="div">
        You have the HEVC compatibility issue if:
        <ul>
          <li>
            <strong>Video file extension is .MOV or .m4v</strong> (iPhone's
            default format)
          </li>
          <li>
            <strong>
              Video plays fine on iPhone/Mac but not on Windows PC
            </strong>
          </li>
          <li>
            Windows Media Player shows <strong>"Can't play this file"</strong>{" "}
            or codec error
          </li>
          <li>
            VLC plays it but <strong>stutters/lags heavily</strong>
          </li>
          <li>
            Your editing software says <strong>"Unsupported codec"</strong> or
            crashes on import
          </li>
          <li>
            When you send the video to Android friends, they can't watch it
          </li>
        </ul>
      </Typography>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mt: 4, fontWeight: 600 }}
      >
        The "Official" Fix (Costs Money, Kinda Sucks)
      </Typography>

      <Typography variant="body1" paragraph>
        Microsoft <em>technically</em> offers HEVC codec support, but they
        charge for it:
      </Typography>

      <Typography variant="body1" component="div" paragraph>
        1. Go to Microsoft Store
        <br />
        2. Buy "<strong>HEVC Video Extensions</strong>" for{" "}
        <strong>$0.99</strong>
        <br />
        3. Install it
        <br />
        4. Hope it works (it often doesn't for older Windows versions)
      </Typography>

      <Typography variant="body1" paragraph>
        <strong>Why this sucks:</strong>
      </Typography>

      <Typography variant="body1" component="div" paragraph>
        • It only fixes <em>your</em> computer. Doesn't help if you need to send
        videos to others.
        <br />
        • Doesn't work on Windows 7 or 8.
        <br />
        • You still can't edit the video in many programs.
        <br />• It's a band-aid, not a real solution.
      </Typography>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mt: 4, fontWeight: 600 }}
      >
        The Real Fix: Convert MOV to MP4 (H.264)
      </Typography>

      <Typography variant="body1" paragraph>
        The permanent solution is to{" "}
        <strong>convert your iPhone videos from HEVC to H.264</strong> (standard
        MP4). This format:
      </Typography>

      <Paper sx={{ p: 3, bgcolor: "success.lighter", mb: 3 }}>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <CheckCircle color="success" sx={{ fontSize: 20 }} />
            <Typography variant="body1">
              <strong>Works on every device:</strong> Windows, Mac, Linux,
              Android, smart TVs, game consoles
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <CheckCircle color="success" sx={{ fontSize: 20 }} />
            <Typography variant="body1">
              <strong>Supported by all editing software:</strong> Premiere,
              Final Cut, DaVinci, iMovie, etc.
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <CheckCircle color="success" sx={{ fontSize: 20 }} />
            <Typography variant="body1">
              <strong>Easy to share:</strong> Works on email, Discord, WhatsApp,
              social media
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <CheckCircle color="success" sx={{ fontSize: 20 }} />
            <Typography variant="body1">
              <strong>No quality loss:</strong> Modern converters maintain the
              same visual quality
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
        Convert Your iPhone Video Here (Free, No Install)
      </Typography>

      <Typography variant="body1" paragraph>
        Drag your .MOV file below and select <strong>MP4</strong> as the output
        format. Conversion takes about 1-2 minutes:
      </Typography>

      {/* EMBEDDED CONVERTER - THE MONEY SHOT */}
      <Box sx={{ my: 4 }}>
        <Converter />
      </Box>

      <Alert severity="info" sx={{ my: 3 }}>
        <Typography variant="body2">
          <strong>Technical Note:</strong> This converts HEVC (H.265) to H.264
          codec while keeping the MP4 container format. The file size will be
          slightly larger (about 1.5-2x) but the quality stays identical to
          human eyes.
        </Typography>
      </Alert>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mt: 4, fontWeight: 600 }}
      >
        Prevent This Problem: Change iPhone Camera Settings
      </Typography>

      <Typography variant="body1" paragraph>
        If you frequently transfer iPhone videos to Windows/Android, you can
        stop this issue from happening in the future:
      </Typography>

      <Paper sx={{ p: 3, bgcolor: "background.default" }}>
        <Typography variant="body1" component="div">
          <strong>On iPhone (iOS 11 or later):</strong>
          <br />
          1. Open <strong>Settings</strong>
          <br />
          2. Scroll down and tap <strong>Camera</strong>
          <br />
          3. Tap <strong>Formats</strong>
          <br />
          4. Select <strong>"Most Compatible"</strong> instead of "High
          Efficiency"
        </Typography>
      </Paper>

      <Typography variant="body1" paragraph sx={{ mt: 2 }}>
        <strong>What this does:</strong> Your iPhone will now record videos in
        H.264 (standard MP4) instead of HEVC. Videos will be larger but will
        work everywhere without conversion.
      </Typography>

      <Alert severity="warning" sx={{ mt: 2 }}>
        <Typography variant="body2">
          <strong>Trade-off:</strong> Video files will be about 2x larger. If
          you have limited iPhone storage (64GB or less), you might want to keep
          using HEVC and just convert videos when needed.
        </Typography>
      </Alert>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mt: 4, fontWeight: 600 }}
      >
        Compatibility Comparison
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "primary.main" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Platform/Software
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                HEVC/MOV
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                H.264/MP4
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Windows 10/11 (default)</TableCell>
              <TableCell sx={{ color: "error.main", fontWeight: "bold" }}>
                ❌ No
              </TableCell>
              <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
                ✅ Yes
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mac/iPhone/iPad</TableCell>
              <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
                ✅ Yes
              </TableCell>
              <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
                ✅ Yes
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Android (varies by phone)</TableCell>
              <TableCell sx={{ color: "warning.main", fontWeight: "bold" }}>
                ⚠️ Maybe
              </TableCell>
              <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
                ✅ Yes
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Adobe Premiere Pro</TableCell>
              <TableCell sx={{ color: "warning.main", fontWeight: "bold" }}>
                ⚠️ Slow
              </TableCell>
              <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
                ✅ Yes
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>DaVinci Resolve (Free)</TableCell>
              <TableCell sx={{ color: "error.main", fontWeight: "bold" }}>
                ❌ No
              </TableCell>
              <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
                ✅ Yes
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>VLC Media Player</TableCell>
              <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
                ✅ Yes
              </TableCell>
              <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
                ✅ Yes
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>YouTube/Instagram/TikTok</TableCell>
              <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
                ✅ Yes
              </TableCell>
              <TableCell sx={{ color: "success.main", fontWeight: "bold" }}>
                ✅ Yes
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
        Common Questions
      </Typography>

      <Typography
        variant="h6"
        component="h4"
        gutterBottom
        sx={{ mt: 2, fontWeight: 600 }}
      >
        Q: Will I lose quality when converting from MOV to MP4?
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>A:</strong> No visible quality loss. Modern converters (like
        this one, which uses FFmpeg) transcode intelligently to preserve
        quality. The file will be larger, but it will look identical.
      </Typography>

      <Typography
        variant="h6"
        component="h4"
        gutterBottom
        sx={{ mt: 2, fontWeight: 600 }}
      >
        Q: Why can't I just rename .MOV to .MP4?
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>A:</strong> Because the problem isn't the filename - it's the
        codec inside. Renaming changes the container but doesn't convert the
        HEVC video codec to H.264. You need actual conversion.
      </Typography>

      <Typography
        variant="h6"
        component="h4"
        gutterBottom
        sx={{ mt: 2, fontWeight: 600 }}
      >
        Q: Can I convert videos shot in 4K or 60fps?
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>A:</strong> Yes. All resolutions (1080p, 4K, etc.) and frame
        rates are supported. The converter preserves your original resolution
        and frame rate.
      </Typography>

      <Typography
        variant="h6"
        component="h4"
        gutterBottom
        sx={{ mt: 2, fontWeight: 600 }}
      >
        Q: Is there a faster way if I have lots of videos?
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>A:</strong> For batch conversion, you can use this tool multiple
        times, or install a desktop app like HandBrake (free, open-source) which
        can convert multiple files at once.
      </Typography>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mt: 4, fontWeight: 600 }}
      >
        The Bottom Line
      </Typography>

      <Typography variant="body1" paragraph>
        Apple prioritizes storage efficiency over compatibility. It's a
        reasonable choice for the Apple ecosystem, but it creates headaches when
        you step outside that ecosystem.
      </Typography>

      <Typography variant="body1" paragraph>
        <strong>The good news:</strong> Converting your videos takes less than 2
        minutes and solves the problem permanently. No codecs to buy, no
        complicated software to learn.
      </Typography>

      <Typography variant="body1" paragraph>
        Just convert your iPhone videos to standard MP4, and they'll work
        everywhere - Windows, Android, editing software, social media, you name
        it.
      </Typography>

      <Alert severity="success" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Problem solved!</strong> Bookmark this page for next time your
          iPhone video won't play on Windows. Share it with friends who have the
          same issue.
        </Typography>
      </Alert>
    </BlogLayout>
  );
}

export default IPhoneVideoBlog;
