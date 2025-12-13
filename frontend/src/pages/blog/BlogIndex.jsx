import { Helmet } from "react-helmet-async";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Chip,
  Stack,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  Description,
  PhoneIphone,
  Work,
} from "@mui/icons-material";

const blogPosts = [
  {
    title:
      "Why your iPhone video (HEVC/MOV) won't play on Windows & How to fix it",
    description:
      "iPhone videos won't play on your Windows PC? Learn why HEVC/MOV format causes compatibility issues and how to convert to MP4 instantly.",
    path: "/blog/iphone-video-hevc-mov-windows",
    category: "Video Conversion",
    icon: <PhoneIphone />,
    tags: ["iPhone", "Windows", "HEVC", "MOV to MP4"],
  },
  {
    title: "Convert PDF to Word for Free: No Sign-up, No Email Required",
    description:
      "Convert PDF to editable Word documents instantly. 100% free, unlimited conversions, no registration, no watermarks.",
    path: "/blog/convert-pdf-to-word-free",
    category: "Document Conversion",
    icon: <Description />,
    tags: ["PDF", "Word", "Free", "No Sign-up"],
  },
  {
    title: "Submit resume in PDF or Word? Why format matters for ATS",
    description:
      "Learn which resume format (PDF vs Word) passes Applicant Tracking Systems better and avoid common resume rejection mistakes.",
    path: "/blog/resume-pdf-word-ats",
    category: "Career Tips",
    icon: <Work />,
    tags: ["Resume", "ATS", "Job Application", "PDF vs Word"],
  },
];

function BlogIndex() {
  return (
    <>
      <Helmet>
        <title>Blog - File Conversion Tips & Guides | Open Convert</title>
        <meta
          name="description"
          content="Free guides on file conversion, video editing, document formatting, and productivity tips. Learn how to convert PDF, videos, and more."
        />
        <meta
          name="keywords"
          content="file conversion blog, video conversion guide, PDF tips, iPhone video help, resume format tips"
        />
        <link rel="canonical" href="https://www.open-convert.com/blog" />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <MuiLink
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "primary.main",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            <HomeIcon sx={{ mr: 0.5, fontSize: 20 }} />
            Home
          </MuiLink>
          <Typography color="text.primary">Blog</Typography>
        </Breadcrumbs>

        {/* Page Title */}
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          File Conversion Guides & Tips
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          paragraph
          sx={{ mb: 4 }}
        >
          Practical guides to solve common file conversion problems. No fluff,
          just solutions.
        </Typography>

        {/* Blog Posts Grid */}
        <Grid container spacing={3}>
          {blogPosts.map((post) => (
            <Grid item xs={12} md={6} lg={4} key={post.path}>
              <Card
                elevation={3}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardActionArea
                  component={Link}
                  to={post.path}
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ mb: 2 }}
                    >
                      {post.icon}
                      <Chip
                        label={post.category}
                        size="small"
                        color="primary"
                      />
                    </Stack>

                    <Typography
                      variant="h5"
                      component="h2"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {post.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      {post.description}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      useFlexGap
                    >
                      {post.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <Card
          sx={{ mt: 6, bgcolor: "primary.lighter", p: 4, textAlign: "center" }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Need to convert a file right now?
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            Use our free converter - no sign-up, no limits, no BS.
          </Typography>
          <MuiLink
            component={Link}
            to="/"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              fontSize: "1.1rem",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Go to Converter →
          </MuiLink>
        </Card>
      </Container>
    </>
  );
}

export default BlogIndex;
