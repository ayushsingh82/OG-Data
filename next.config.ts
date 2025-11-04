import type { NextConfig } from "next";
import webpack from "webpack";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  // Configure webpack to ignore contract files
  webpack: (config, { isServer }) => {
    // Add fallbacks for Node.js modules (only for client-side)
    if (!isServer) {
      // Mark Node.js modules as external to prevent bundling
      config.externals = config.externals || [];
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
        'node:child_process',
        'node:crypto',
        'node:stream',
        'node:path',
        'node:os',
        'node:http',
        'node:https',
        'node:zlib',
        'node:util',
        'node:buffer',
        'node:process',
        'node:fs',
        'node:fs/promises',
      ];

      // Add externals function to handle dynamic imports
      config.externals.push(({ context, request }, callback) => {
        if (nodeModules.some(mod => request === mod || request === `node:${mod}` || request.startsWith(`node:${mod}/`))) {
          return callback(null, `commonjs ${request}`);
        }
        callback();
      });

      // Add aliases to replace node: prefixed modules with empty stubs
      config.resolve.alias = {
        ...config.resolve.alias,
        'node:crypto': false,
        'node:fs': false,
        'node:fs/promises': false,
        'node:path': false,
        'node:os': false,
        'node:http': false,
        'node:https': false,
        'node:stream': false,
        'node:util': false,
        'node:buffer': false,
        'node:process': false,
        'node:child_process': false,
      };

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
      };

      // Use IgnorePlugin to completely ignore these modules
      config.plugins.push(
        new webpack.IgnorePlugin({
          checkResource(resource: string) {
            return nodeModules.some(
              (mod) => resource === mod || resource === `node:${mod}` || resource.startsWith(`node:${mod}/`)
            );
          },
        })
      );
    }
    
    return config;
  },
  // Exclude contract directory from the build output
  outputFileTracingExcludes: {
    '*': ['./contract/**/*'],
  },
};

export default nextConfig;
