/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    webpackBuildWorker: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/about', destination: '/a-note-from-founder', permanent: false },
      { source: '/about-us', destination: '/a-note-from-founder', permanent: false },
      { source: '/founder', destination: '/a-note-from-founder', permanent: false },
      { source: '/our-team', destination: '/a-note-from-founder', permanent: false },
      { source: '/privacy', destination: '/refund-policy', permanent: false },
      { source: '/privacy-policy', destination: '/refund-policy', permanent: false },
      { source: '/terms', destination: '/refund-policy', permanent: false },
      { source: '/terms-and-conditions', destination: '/refund-policy', permanent: false },
      { source: '/refund', destination: '/refund-policy', permanent: false },
      { source: '/cancellation', destination: '/refund-policy', permanent: false },
      { source: '/jobs', destination: '/careers', permanent: false },
      { source: '/apply', destination: '/careers', permanent: false },
      { source: '/work-with-us', destination: '/careers', permanent: false },
      { source: '/contact-us', destination: '/contact', permanent: false },
      { source: '/support', destination: '/contact', permanent: false },
      { source: '/help', destination: '/contact', permanent: false },
      { source: '/quote', destination: '/contact', permanent: false },
      { source: '/desk', destination: '/contact', permanent: false },
      { source: '/feedback', destination: '/reviews', permanent: false },
      { source: '/testimonials', destination: '/reviews', permanent: false },
      { source: '/solutions', destination: '/services', permanent: false },
    ];
  },
};

export default nextConfig;
