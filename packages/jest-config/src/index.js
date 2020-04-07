const { pathExistsSync } = require('fs-extra');
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

// Will be tried in order and the first one that exists will be used.
const setupTestsFilePaths = [
  path.join(process.cwd(), 'src', 'setupTests.ts'),
  path.join(process.cwd(), 'tests', 'setupTests.ts'),
  path.join(process.cwd(), 'tests', 'setup.ts'),
];

const setupTestsFile = setupTestsFilePaths.find((filePath) =>
  pathExistsSync(filePath)
);

module.exports = {
  // Work around a quirk in how jest resolves the preset: it uses its own
  // module resolution instead of Node's so it breaks in yarn workspaces.
  // If we give it an absolute path then it will look for a `jest-preset.js`
  // in that path.
  preset: __dirname,
  testEnvironment: require.resolve('jest-environment-jsdom-fifteen'),

  // We polyfill some things commonly found in tests. We don't want to polyfill
  // everything, especially since we only support modern versions of Node.
  setupFiles: [path.join(__dirname, 'polyfills.js')],

  // Here a user could setup e.g. custom jest matchers.
  setupFilesAfterEnv: setupTestsFile ? [setupTestsFile] : [],

  // Our custom runtime that exposes a way to add coverage from external sources.
  moduleLoader: path.join(__dirname, './jest-runtime.js'),

  rootDir: process.cwd(),
  moduleNameMapper: compilerOptions.paths
    ? {
        ...pathsToModuleNameMapper(compilerOptions.paths, {
          // The prefix must have a trailing slash.
          prefix: path.join(compilerOptions.baseUrl, '/'),
        }),
      }
    : null,
  modulePathIgnorePatterns: ['dist'],

  // Ignore static assets such as images and stylesheets.
  transform: {
    '\\.(css|less)$': require.resolve('./style-mock.js'),
    // Treat everything else as a static asset and mock it.
    '^(?!.*\\.(js|jsx|ts|tsx|css|less|json)$)': require.resolve(
      './file-mock.js'
    ),
  },

  // When importing without an extension Jest will try these in order.
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Improves speed by 100% for visual tests.
  extraGlobals: ['Math'],

  testMatch: ['**/*.(spec|test).{ts,tsx}'],
  collectCoverageFrom: [
    '**/src/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/*.(spec|test|stories).{ts,tsx}',
    '!**/vendor/**/*',
  ],
  coverageDirectory: '<rootDir>/tests/results',
  coverageReporters: ['json', 'text', 'html'],
  coverageThreshold: {
    global: {
      lines: 100,
      branches: 100,
    },
  },

  globals: {
    'ts-jest': {
      tsConfig: {
        // Minimise transpilation since tests run in modern Node.
        target: 'es6',

        // Some tsconfigs e.g. the ones owned by create-react-app turn this on
        // which causes some type errors across file boundaries to be silenced.
        isolatedModules: false,

        // next.js forces `jsx: 'preserve'` for their toolchain, but Jest wants
        // the transformer to transpile the syntax.
        ...(compilerOptions.jsx === ts.JsxEmit.Preserve && { jsx: 'react' }),
      },
    },
  },
};
