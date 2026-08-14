/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict mode for better React error detection in development
  reactStrictMode: true,

  // Compress output for better performance
  compress: true,

  // Power headers — CSP and security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Image optimization — allow external image sources when needed
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },

  // Logging for debugging (dev only effect)
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
};

export default nextConfig;
