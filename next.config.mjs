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
  webpack(config, { dev }) {
    if (dev) { 
      config.devtool = 'eval-source-map';
    } else {
      config.devtool = 'source-map';
    }
    return config;
  },
};

export default config;