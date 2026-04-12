/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["react-icons", "lucide-react"],
  },
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

