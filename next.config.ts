import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  // Generate ETags for caching
  generateEtags: true,
};

export default nextConfig;
