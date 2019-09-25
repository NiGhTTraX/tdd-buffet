const baseConfig = require('../packages/tdd-buffet/src/config/jest.config');

module.exports = {
  ...baseConfig,

  forceCoverageMatch: [
    '**/tests/coverage/*.ts',
    '**/tests/coverage/*.tsx'
  ]
};
