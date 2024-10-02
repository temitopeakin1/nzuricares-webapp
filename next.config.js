/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      POSTMARK_SERVER_TOKEN: process.env.POSTMARK_SERVER_TOKEN,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
    },
    async redirects() {
      return [
        {
          source: '/care-professionals',
          destination: '/care-professionals/how-it-works',
          permanent: true,
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  
