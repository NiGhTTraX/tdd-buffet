// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import { Config } from '@jest/types';
import { pathExistsSync } from 'fs-extra';
import {
  CoverageMapData,
  createCoverageMap,
  FileCoverageData,
} from 'istanbul-lib-coverage';
import { run as runJest } from 'jest';

/* eslint-disable no-underscore-dangle */
declare global {
  namespace jest {
    /**
     * @returns true if the coverage data was registered, false if e.g. the file should be ignored.
     */
    export function addCoverageFor(filename: string): boolean;
    export const config: Config.ProjectConfig;
  }

  namespace NodeJS {
    interface Global {
      __coverage__: CoverageObject;
    }
  }
}

/**
 * Declare a block of tests.
 *
 * You can have nested blocks. You don't need a block in order to define tests.
 */
export function runnerDescribe(name: string, definition: () => void) {
  describe(name, definition);
}

/**
 * Declare a test.
 *
 * You don't need to be inside a `describe` block to declare a test.
 *
 * @param name
 * @param definition Omitting this will create a 'pending' test.
 */
export function runnerIt(
  name: string,
  definition?: (testName: string) => Promise<any> | void
) {
  if (definition) {
    // @ts-ignore because @types/jest doesn't expose this
    const test: { getFullName: () => string } = it(name, () =>
      definition(test.getFullName())
    );
  } else {
    it.todo(name);
  }
}

/**
 * Run some set up code before each test in the current `describe` block.
 */
export function runnerBeforeEach(definition: () => Promise<any> | void) {
  beforeEach(definition);
}

/**
 * Run some tear down code after each test in the current `describe` block.
 */
export function runnerAfterEach(definition: () => Promise<any> | void) {
  afterEach(definition);
}

/**
 * Run some set up code __once__ before all the tests in the current `describe` block.
 */
export function runnerBefore(definition: () => Promise<any> | void) {
  beforeAll(definition);
}

/**
 * Run some tear down code __once__ after all the tests in the current `describe` block.
 */
export function runnerAfter(definition: () => Promise<any> | void) {
  afterAll(definition);
}

export type CoverageObject = {
  [key: string]: FileCoverageData & {
    inputSourceMap?: {
      file: string;
      sources: string[];
    };
  };
};

/**
 * Add coverage data to the current report.
 *
 * @param coverage Istanbul coverage data.
 */
export function addCoverageData(coverage: CoverageMapData) {
  let coverageObject = global.__coverage__;

  /* istanbul ignore next: because it will always be present in CI,
     but it might not be present locally or when no instrumented
     file (that would create it) is run through Jest */
  if (!coverageObject) {
    // eslint-disable-next-line no-multi-assign
    coverageObject = global.__coverage__ = {};
  }

  mergeCoverage(coverage, coverageObject);
}

/* istanbul ignore next: because we don't want the coverage to
   increment while we update it */
function mergeCoverage(source: CoverageMapData, dest: CoverageObject) {
  const mergedCoverage = createCoverageMap(
    // @ts-ignore the runtime only wants CoverageMapData.data
    dest
  );

  mergedCoverage.merge(
    // @ts-ignore the runtime only wants CoverageMapData.data
    translateCoveragePaths(source)
  );

  mergedCoverage.files().forEach((filepath) => {
    // TODO: we're running tests with fake file paths
    if (pathExistsSync(filepath)) {
      if (!registerSourceMap(filepath)) {
        return;
      }
    }

    const fileCoverage = mergedCoverage.fileCoverageFor(filepath);

    // eslint-disable-next-line no-param-reassign
    dest[filepath] = fileCoverage.data;
  });
}

function getTranslatedPath(key: string) {
  return key.replace(/^\/usr\/src\/app/g, jest.config.rootDir);
}

function translateCoveragePaths(
  coverageObject: CoverageObject
): CoverageObject {
  return Object.keys(coverageObject).reduce((acc, key) => {
    const translatedPath = getTranslatedPath(key);

    const data = coverageObject[key];

    const { inputSourceMap } = data;

    return {
      ...acc,
      [translatedPath]: {
        s: data.s,
        b: data.b,
        f: data.f,
        statementMap: data.statementMap,
        fnMap: data.fnMap,
        branchMap: data.branchMap,
        path: translatedPath,
        inputSourceMap: inputSourceMap && {
          ...inputSourceMap,
          file: getTranslatedPath(inputSourceMap.file),
          sources: inputSourceMap.sources.map((s: string) =>
            getTranslatedPath(s)
          ),
        },
      },
    };
  }, {});
}

function registerSourceMap(filename: string): boolean {
  return jest.addCoverageFor(filename);
}

/* istanbul ignore next because this is hard to run through jest because it is running jest */
export async function run(argv: string[]) {
  // Push our config if there isn't one specified.
  if (!argv.includes('--config')) {
    argv.push('--config', require.resolve('@tdd-buffet/jest-config'));
  }

  return runJest(argv);
}
