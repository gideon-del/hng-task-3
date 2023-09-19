/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        pathname: "/*",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
