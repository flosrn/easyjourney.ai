/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "*.googleusercontent.com",
      },
    ],
    loader: "custom",
    loaderFile: "./node_modules/@uploadcare/nextjs-loader/build/loader.js",
  },
};

export default nextConfig;
