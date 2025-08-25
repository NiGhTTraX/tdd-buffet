// eslint-disable-next-line @typescript-eslint/no-require-imports
const baseConfig = require('../../tests/jest.config');

module.exports = {
  ...baseConfig,
  testEnvironment: 'node',
};
