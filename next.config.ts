import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['172.20.10.10'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
