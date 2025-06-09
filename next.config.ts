import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true, // This helps with html2canvas compatibility
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "bun:test": false,
    };
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ["@happy-dom/global-registrator"],
  },
};

export default nextConfig;
