const baseConfig = require('../packages/tdd-buffet/src/config/jest.config');

module.exports = {
  ...baseConfig,

  collectCoverageFrom: [
    ...baseConfig.collectCoverageFrom,
    '!**/tests/coverage/ignored.js'
  ],
  forceCoverageMatch: ['**/tests/coverage/*.ts', '**/tests/coverage/*.tsx']
};
