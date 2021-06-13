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
  // Manually requiring the package instead of using just 'jsdom'
  // to avoid module resolution picking up a different version inside
  // a project with hoisted dependencies.
  testEnvironment: require.resolve('jest-environment-jsdom'),

  // We polyfill some things commonly found in tests. We don't want to polyfill
  // everything, especially since we only support modern versions of Node.
  setupFiles: [path.join(__dirname, 'polyfills.js')],

  // Here a user could setup e.g. custom jest matchers.
  setupFilesAfterEnv: setupTestsFile ? [setupTestsFile] : [],

  rootDir: process.cwd(),
  moduleNameMapper: compilerOptions.paths
    ? {
        ...pathsToModuleNameMapper(compilerOptions.paths, {
          /**
           * baseURL is the absolute path resolved from the config it's defined in.
           * pathsBasePath is the absolute path of the config that defines the paths.
           * baseUrl, if defined, is pathsBasePath + baseUrl.
           *
           * @example
           * // project/tsconfig.base.json
           * {
           *   compilerOptions: {
           *     baseUrl: './packages',
           *     paths: {
           *       'tdd-buffet': ['tdd-buffet/src']
           *     }
           *   }
           * }
           *
           * // project/packages/foobar/tsconfig.json
           * {
           *   extends: '../../tsconfig.base.json',
           * }
           *
           * compilerOptions.baseUrl = 'project/packages';
           * compilerOptions.pathsBasePath = 'project/';
           *
           * @example
           * // project/tsconfig.base.json
           * {
           *   compilerOptions: {
           *     paths: {
           *       'tdd-buffet': ['packages/tdd-buffet/src']
           *     }
           *   }
           * }
           *
           * // project/packages/foobar/tsconfig.json
           * {
           *   extends: '../../tsconfig.base.json',
           * }
           *
           * compilerOptions.baseUrl = undefined;
           * compilerOptions.pathsBasePath = 'project/';
           */
          prefix: compilerOptions.baseUrl || compilerOptions.pathsBasePath,
        }),
      }
    : null,
  modulePathIgnorePatterns: ['dist'],

  transform: {
    // Using this directly as opposed to the preset because of
    // to be able to manually specify the ts-jest dependency.
    '^.+\\.tsx?$': require.resolve('ts-jest'),

    // Ignore static assets such as images and stylesheets.
    '\\.(css|less)$': require.resolve('./style-mock.js'),
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|less|json)$)': require.resolve(
      './file-mock.js'
    ),
  },

  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],

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
  coverageReporters: ['lcov', 'text'],
  coverageThreshold: {
    global: {
      lines: 100,
      branches: 100,
    },
  },

  globals: {
    'ts-jest': {
      tsconfig: {
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
