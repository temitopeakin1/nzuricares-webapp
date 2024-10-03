/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
      return [
          {
          source: '/healthcare-professionals',
          destination: '/healthcare-professionals/how-it-works',
          permanent: true,
          }
      ]
  },
};

module.exports = nextConfig

