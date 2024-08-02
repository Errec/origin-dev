const config = {
  webpack(config, { dev }) {
    if (dev) {
      config.devtool = 'eval-source-map'; // Fast source maps for development
    } else {
      config.devtool = 'source-map'; // Full source maps for production
    }
    return config;
  },
};

export default config;