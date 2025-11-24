/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this line to your existing config
  output: 'standalone',
  env: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // any host
      },
      {
        protocol: 'http',
        hostname: '**', // optional: allow http too
      },
    ],
  },
}

module.exports = nextConfig