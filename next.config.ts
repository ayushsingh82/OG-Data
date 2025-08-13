import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Configure webpack to ignore contract files
  webpack: (config) => {
    // Add fallbacks for Node.js modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    return config;
  },
  // Exclude contract directory from the build output
  outputFileTracingExcludes: {
    '*': ['./contract/**/*'],
  },
};

export default nextConfig;
