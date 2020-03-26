const baseConfig = require('@tdd-buffet/jest-config');

module.exports = {
  ...baseConfig,

  collectCoverageFrom: [
    ...baseConfig.collectCoverageFrom,
    '!**/tests/coverage/ignored.js',
  ],
  forceCoverageMatch: ['**/tests/coverage/*.ts', '**/tests/coverage/*.tsx'],
};
