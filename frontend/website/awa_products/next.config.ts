import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Specific Unsplash allow karein
      },
      {
        protocol: 'https',
        hostname: '**', // Backup: Baki tamam HTTPS sites ke liye
      },
    ],
  },
};

export default nextConfig;