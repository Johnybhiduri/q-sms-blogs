import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/blog",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
