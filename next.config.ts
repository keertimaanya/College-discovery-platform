import type { NextConfig } from "next";

/**
 * Next.js Core Configurations
 * -----------------------------------------------------------------------------
 * This configuration file allows you to customize the default compiler,
 * bundler (Webpack/Turbopack), routing redirects, image optimization domains,
 * and environment settings for your Next.js application.
 * -----------------------------------------------------------------------------
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
