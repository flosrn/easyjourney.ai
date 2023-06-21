import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["cdn.discordapp.com", "cdn.midjourney.com"],
    remotePatterns: [
      {
        hostname: "*.googleusercontent.com",
      },
      {
        hostname: "ucarecdn.com",
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // the project has ESLint errors.
    ignoreDuringBuilds: false,
  },
};

export default withPlaiceholder(nextConfig);
