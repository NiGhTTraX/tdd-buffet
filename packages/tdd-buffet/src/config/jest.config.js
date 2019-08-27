const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require(path.join(process.cwd(), 'tsconfig'));

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  // Our custom runtime that exposes a way to add coverage from external sources.
  moduleLoader: path.join(__dirname, './jest-runtime.js'),

  rootDir: process.cwd(),
  testMatch: ['**/tests/**/*.spec.{ts,tsx}'],
  moduleNameMapper: compilerOptions.paths ? {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/packages/' })
  } : null,
  modulePathIgnorePatterns: ['dist'],

  // Improves speed by 100% for visual tests.
  extraGlobals: ['Math'],

  collectCoverageFrom: [
    '**/src/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/tests/**/*',
    '!**/vendor/**/*'
  ],
  coverageDirectory: '<rootDir>/tests/results',
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
        // Minimise transpilation since tests run in modern Node.
        target: 'es6'
      }
    }
  }
};
