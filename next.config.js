/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
            source: '/care-professionals',
            destination: '/care-professionals/how-it-works',
            permanent: true,
            }
        ]
    }
};

module.exports = nextConfig




