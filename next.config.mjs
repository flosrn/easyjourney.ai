/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["cdn.discordapp.com"],
    remotePatterns: [
      {
        hostname: "*.googleusercontent.com",
      },
    ],
    loader: "custom",
    loaderFile: "./node_modules/@uploadcare/nextjs-loader/build/loader.js",
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
