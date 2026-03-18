'use client';

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
} from '@mui/material';
import { Link } from '@/i18n/routing';
import {
  Home as HomeIcon,
  Description,
  PhoneIphone,
  Work,
} from '@mui/icons-material';
import { useTranslations } from 'next-intl';

const iconMap = {
  PhoneIphone: PhoneIphone,
  Description: Description,
  Work: Work,
};

const postSlugs = [
  'iphone-video-hevc-mov-windows',
  'convert-pdf-to-word-free',
  'resume-pdf-word-ats',
];

// Add 'icon' mapping here as it's not part of the translation
const postIcons = {
  'iphone-video-hevc-mov-windows': 'PhoneIphone',
  'convert-pdf-to-word-free': 'Description',
  'resume-pdf-word-ats': 'Work',
};

export default function BlogIndex() {
  const t = useTranslations('blog');

  const blogPosts = postSlugs.map(slug => ({
    slug,
    title: t(`posts.${slug}.title`),
    description: t(`posts.${slug}.description`),
    category: t(`posts.${slug}.category`),
    icon: postIcons[slug],
    // Tags are an array, so we need to handle them differently if they need translation.
    // For now, assuming tags are simple strings.
    tags: t.raw(`posts.${slug}.tags`),
  }));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
          {t('index.breadcrumbs.home')}
        </MuiLink>
        <Typography color="text.primary">{t('index.breadcrumbs.blog')}</Typography>
      </Breadcrumbs>

      {/* Page Title */}
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
        {t('index.title')}
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        paragraph
        sx={{ mb: 4 }}
      >
        {t('index.description')}
      </Typography>

      {/* Blog Posts Grid */}
      <Grid container spacing={3}>
        {blogPosts.map((post) => {
          const IconComponent = iconMap[post.icon];
          return (
            <Grid item xs={12} md={6} lg={4} key={post.slug}>
              <Card
                elevation={3}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardActionArea
                  component={Link}
                  href={`/blog/${post.slug}`}
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ mb: 2 }}
                    >
                      {IconComponent && <IconComponent />}
                      <Chip label={post.category} size="small" color="primary" />
                    </Stack>

                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {post.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {post.description}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
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
          );
        })}
      </Grid>

      {/* CTA Section */}
      <Card
        sx={{ mt: 6, bgcolor: 'primary.lighter', p: 4, textAlign: 'center' }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          {t('index.cta.title')}
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          {t('index.cta.description')}
        </Typography>
        <MuiLink
          component={Link}
          href="/"
          sx={{
            color: 'primary.main',
            fontWeight: 600,
            fontSize: '1.1rem',
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          {t('index.cta.link')}
        </MuiLink>
      </Card>
    </Container>
  );
}
