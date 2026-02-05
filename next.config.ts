import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  // Trailing slash for static hosting compatibility
  trailingSlash: true,
  // Generate ETags for caching
  generateEtags: true,
};

export default nextConfig;
