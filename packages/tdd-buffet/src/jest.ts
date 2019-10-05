// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import { Config } from '@jest/types';
import { pathExistsSync } from 'fs-extra';
import { CoverageMapData, createCoverageMap, FileCoverageData } from 'istanbul-lib-coverage';
import { run as runJest } from 'jest';
import path from 'path';

/* eslint-disable no-underscore-dangle */
declare global {
  namespace jest {
    export function addCoverageFor(filename: string): void;
    export const config: Config.ProjectConfig;
  }

  namespace NodeJS {
    interface Global {
      __coverage__: CoverageObject;
    }
  }
}

export function runnerDescribe(name: string, definition: () => void) {
  describe(name, definition);
}

export function runnerIt(name: string, definition?: (testName: string) => Promise<any>|void) {
  if (definition) {
    // @ts-ignore because @types/jest doesn't expose this
    const test: { getFullName: () => string } = it(
      name,
      () => definition(test.getFullName())
    );
  } else {
    it.todo(name);
  }
}

export function runnerBeforeEach(definition: () => Promise<any>|void) {
  beforeEach(definition);
}

export function runnerAfterEach(definition: () => Promise<any>|void) {
  afterEach(definition);
}

export function runnerBefore(definition: () => Promise<any>|void) {
  beforeAll(definition);
}

export function runnerAfter(definition: () => Promise<any>|void) {
  afterAll(definition);
}

export type CoverageObject = { [key: string]: FileCoverageData };

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
function mergeCoverage(
  source: CoverageMapData,
  dest: CoverageObject
) {
  const mergedCoverage = createCoverageMap(
    // @ts-ignore the runtime only wants CoverageMapData.data
    dest
  );

  mergedCoverage.merge(
    // @ts-ignore the runtime only wants CoverageMapData.data
    translateCoveragePaths(source)
  );

  mergedCoverage.files().forEach(filepath => {
    // TODO: we're running tests with fake file paths
    if (pathExistsSync(filepath)) {
      registerSourceMap(filepath);
    }

    const fileCoverage = mergedCoverage.fileCoverageFor(filepath);

    // eslint-disable-next-line no-param-reassign
    dest[filepath] = fileCoverage.data;
  });
}

function translateCoveragePaths(
  coverageObject: CoverageObject
): CoverageObject {
  return Object.keys(coverageObject).reduce((acc, key) => {
    const translatedPath = key.replace(
      /^\/usr\/src\/app/g,
      jest.config.rootDir
    );

    const data = coverageObject[key];

    return {
      ...acc,
      [translatedPath]: {
        s: data.s,
        b: data.b,
        f: data.f,
        statementMap: data.statementMap,
        fnMap: data.fnMap,
        branchMap: data.branchMap,
        path: translatedPath
      }
    };
  }, {});
}

function registerSourceMap(filename: string) {
  jest.addCoverageFor(filename);
}

/* istanbul ignore next because this is hard to run through jest because it is running jest */
export async function run(argv: string[]) {
  // Push our config if there isn't one specified.
  if (!argv.includes('--config')) {
    argv.push('--config', path.join(__dirname, './config/jest.config.js'));
  }

  if (argv.includes('--coverage')) {
    // TODO: don't automatically set this, let the user set this; that way they can also
    // disable it if they don't have GUI tests
    process.env.TDD_BUFFET_COVERAGE = '1';
  }

  return runJest(argv);
}
