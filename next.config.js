/** @type {import('next').NextConfig} */
const backendApiBase = (process.env.WEB_API_URL || process.env.NEXT_PUBLIC_WEB_API_URL || "http://localhost:9095/api").replace(/\/+$/, "");

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendApiBase}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
