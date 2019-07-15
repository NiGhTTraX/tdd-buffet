const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('../tsconfig');

const rootDir = path.join(__dirname, '../');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  rootDir,
  testMatch: ['**/tests/**/*.spec.ts'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/packages/' })
  },

  // Improves speed by 100%.
  extraGlobals: ['Math'],

  collectCoverageFrom: [
    '**/src/**/*.ts',
    '!**/*.d.ts',
    '!**/tests/**/*',
    '!**/vendor/**/*'
  ],
  coverageDirectory: path.join(rootDir, 'tests/results'),
  coverageReporters: ['json', 'html'],

  globals: {
    'ts-jest': {
      tsConfig: {
        // Sourcemaps are kinda broken so we avoid transpiling,
        // plus it's not needed since tests run in latest node.
        target: 'es6'
      }
    }
  }
};
