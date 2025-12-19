const withNextIntl = require('next-intl/plugin')(
  './src/i18n/request.js'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  // API proxy to backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL
          ? `${process.env.NEXT_PUBLIC_API_URL}/:path*`
          : 'http://localhost:3001/api/:path*',
      },
    ];
  },

  // Increase body size limit for file uploads (default: 10MB)
  experimental: {
    serverActions: {
      bodySizeLimit: '500mb',
    },
  },

  // Image optimization
  images: {
    domains: ['www.open-convert.com'],
  },
};

module.exports = withNextIntl(nextConfig);
