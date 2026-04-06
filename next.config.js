const { execSync } = require('child_process');

let gitHash = 'unknown';
try {
  gitHash = execSync('git rev-parse --short HEAD 2>nul').toString().trim();
} catch {
  gitHash = process.env.NEXT_PUBLIC_GIT_HASH || 'unknown';
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_GIT_HASH: gitHash,
  },
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  turbopack: {},
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: false,
        ignored: /node_modules/,
        aggregateTimeout: 500,
      };
    }
    return config;
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5,
  },
};

module.exports = nextConfig;
