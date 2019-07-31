const baseConfig = require('../packages/tdd-buffet/src/config/jest.config');

module.exports = {
  ...baseConfig,

  collectCoverageFrom: [
    ...baseConfig.collectCoverageFrom,
    '**/tests/coverage/original.ts'
  ],

  forceCoverageMatch: [
    '**/tests/coverage/original.ts'
  ]
};
