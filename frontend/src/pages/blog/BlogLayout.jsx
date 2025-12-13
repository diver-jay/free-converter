import { Helmet } from "react-helmet-async";
import { Container, Box, Typography, Breadcrumbs, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { Home as HomeIcon, Article as ArticleIcon } from "@mui/icons-material";

function BlogLayout({ title, description, keywords, canonicalUrl, children }) {
  return (
    <>
      <Helmet>
        <title>{title} | Open Convert - Free File Converter</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://www.open-convert.com${canonicalUrl}`} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://www.open-convert.com${canonicalUrl}`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>

      <Container maxWidth="md" sx={{ py: 4 }}>
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
          <MuiLink
            component={Link}
            to="/blog"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "primary.main",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            <ArticleIcon sx={{ mr: 0.5, fontSize: 20 }} />
            Blog
          </MuiLink>
          <Typography color="text.primary">{title}</Typography>
        </Breadcrumbs>

        {/* Blog Title */}
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
          {title}
        </Typography>

        {/* Blog Content */}
        <Box sx={{ "& > *:not(:last-child)": { mb: 3 } }}>{children}</Box>
      </Container>
    </>
  );
}

export default BlogLayout;
