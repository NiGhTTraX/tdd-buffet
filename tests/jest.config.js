const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('../tsconfig');

const rootDir = path.join(__dirname, '../');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  rootDir,
  testMatch: ['**/tests/**/*.spec.{ts,tsx}'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/packages/' })
  },
  modulePathIgnorePatterns: ['dist'],

  // Improves speed by 100%.
  extraGlobals: ['Math'],

  collectCoverageFrom: [
    '**/src/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/tests/**/*',
    '!**/vendor/**/*'
  ],
  coverageDirectory: path.join(rootDir, 'tests/results'),
  coverageReporters: ['json', 'text', 'html'],
  coverageThreshold: {
    global: {
      lines: 100,
      branches: 100
    }
  },

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
