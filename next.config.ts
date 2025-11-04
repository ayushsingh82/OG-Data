import type { NextConfig } from "next";
import webpack from "webpack";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  // Configure webpack to ignore contract files
  webpack: (config, { isServer }) => {
    // Add fallbacks for Node.js modules (only for client-side)
    if (!isServer) {
      const nodeModules = [
        'child_process',
        'crypto',
        'stream',
        'path',
        'os',
        'http',
        'https',
        'zlib',
        'util',
        'buffer',
        'process',
        'fs',
        'fs/promises',
      ];

      // Add fallbacks for all Node.js modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        'fs/promises': false,
        net: false,
        tls: false,
        child_process: false,
        crypto: false,
        stream: false,
        path: false,
        os: false,
        http: false,
        https: false,
        zlib: false,
        util: false,
        buffer: false,
        process: false,
        // Add node: prefixed modules
        'node:child_process': false,
        'node:crypto': false,
        'node:stream': false,
        'node:path': false,
        'node:os': false,
        'node:http': false,
        'node:https': false,
        'node:zlib': false,
        'node:util': false,
        'node:buffer': false,
        'node:process': false,
        'node:fs': false,
        'node:fs/promises': false,
      };

      // Use IgnorePlugin to completely ignore these modules
      config.plugins.push(
        new webpack.IgnorePlugin({
          checkResource(resource: string) {
            // Check for both regular and node: prefixed modules
            const isNodeModule = nodeModules.some(
              (mod) => 
                resource === mod || 
                resource === `node:${mod}` || 
                resource.startsWith(`node:${mod}/`) ||
                resource.includes(`/${mod}`)
            );
            return isNodeModule;
          },
        })
      );

      // Add NormalModuleReplacementPlugin to replace dynamic imports
      nodeModules.forEach((mod) => {
        config.plugins.push(
          new webpack.NormalModuleReplacementPlugin(
            new RegExp(`^${mod}$`),
            path.resolve(__dirname, 'empty-module.js')
          )
        );
        config.plugins.push(
          new webpack.NormalModuleReplacementPlugin(
            new RegExp(`^node:${mod}$`),
            path.resolve(__dirname, 'empty-module.js')
          )
        );
      });
    }
    
    return config;
  },
  // Exclude contract directory from the build output
  outputFileTracingExcludes: {
    '*': ['./contract/**/*'],
  },
};

export default nextConfig;
