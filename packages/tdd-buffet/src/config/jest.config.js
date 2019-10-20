const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const ts = require('typescript');

const configName = ts.findConfigFile(process.cwd(), ts.sys.fileExists);
const { config: configContent } = ts.readConfigFile(
  configName,
  ts.sys.readFile
);
const { options: compilerOptions } = ts.parseJsonConfigFileContent(
  configContent,
  ts.sys,
  path.dirname(configName)
);

module.exports = {
  // Work around a quirk in how jest resolves the preset: it uses its own
  // module resolution instead of Node's so it breaks in yarn workspaces.
  // If we give it an absolute path then it will look for a `jest-preset.js`
  // in that path.
  preset: __dirname,
  testEnvironment: 'jsdom',
  // We polyfill some things commonly found in tests. We don't want to polyfill
  // everything, especially since we only support modern versions of Node.
  setupFiles: [
    path.join(__dirname, 'polyfills.js')
  ],

  // Our custom runtime that exposes a way to add coverage from external sources.
  moduleLoader: path.join(__dirname, './jest-runtime.js'),

  rootDir: process.cwd(),
  moduleNameMapper: compilerOptions.paths
    ? {
        ...pathsToModuleNameMapper(compilerOptions.paths, {
          // The prefix must have a trailing slash.
          prefix: path.join(compilerOptions.baseUrl, '/')
        })
      }
    : null,
  modulePathIgnorePatterns: ['dist'],

  // Ignore static assets such as images and stylesheets.
  transform: {
    '\\.(css|less)$': require.resolve('./style-mock.js'),
    // Treat everything else as a static asset and mock it.
    '^(?!.*\\.(js|jsx|ts|tsx|css|less|json)$)': require.resolve(
      './file-mock.js'
    )
  },

  // When importing without an extension Jest will try these in order.
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Improves speed by 100% for visual tests.
  extraGlobals: ['Math'],

  testMatch: ['**/*.(spec|test).{ts,tsx}'],
  collectCoverageFrom: [
    '**/src/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/*.(spec|test).{ts,tsx}',
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
