import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  distDir: 'out',
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true,
  },
};

export default nextConfig;
