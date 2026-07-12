/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

// Applied in production only: dev needs 'unsafe-eval' and websockets for
// React Fast Refresh. 'unsafe-inline' is required by Next.js bootstrap
// scripts and SSR style attributes (Framer Motion / next/font).
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://formspree.io https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://formspree.io",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  ...(isProd ? [{ key: 'Content-Security-Policy', value: contentSecurityPolicy }] : []),
];

const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
