const baseConfig = require('../../src/config/webpack.config');
const path = require('path');

module.exports = webpackEnv => {
  const config = baseConfig(webpackEnv);

  return {
    ...config,

    entry: path.join(__dirname, 'entry.js')
  };
};
