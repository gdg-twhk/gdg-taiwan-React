import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  distDir: 'build',
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
