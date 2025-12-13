import {
  Container,
  Box,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import { Link } from '@/i18n/routing';
import { Home as HomeIcon, Article as ArticleIcon } from '@mui/icons-material';

function BlogLayout({ title, children }) {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <MuiLink
          component={Link}
          href="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'primary.main',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          <HomeIcon sx={{ mr: 0.5, fontSize: 20 }} />
          Home
        </MuiLink>
        <MuiLink
          component={Link}
          href="/blog"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'primary.main',
            '&:hover': { textDecoration: 'underline' },
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
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
        }}
      >
        {title}
      </Typography>

      {/* Blog Content */}
      <Box sx={{ '& > *:not(:last-child)': { mb: 3 } }}>{children}</Box>
    </Container>
  );
}

export default BlogLayout;
