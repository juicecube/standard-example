const path = require('path');

module.exports = {
  webpack: {
    devServer: {
      port: 5002,
    },
    alias: {
      'example': path.resolve(__dirname, './src'),
    },
  },
};
