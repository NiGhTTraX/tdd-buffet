const baseConfig = require('../packages/tdd-buffet/src/config/jest.config');

module.exports = {
  ...baseConfig,

  collectCoverageFrom: [
    ...baseConfig.collectCoverageFrom,
    '**/tests/coverage/simple.ts',
    '**/tests/coverage/docker.ts',
    '!usr/src/app/**/*'
  ]
};
