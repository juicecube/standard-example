const path = require('path');

module.exports = {
  webpack: {
    alias: {
      "example": path.resolve(__dirname, './src'),
    }
  }
}