const path = require('path');

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    esmExternals: 'loose',
  },
  images: {
    remotePatterns: [
      { 
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: ''
      }
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias['@'] = path.resolve(__dirname, './app');
    return config;
  },
};

module.exports = config;