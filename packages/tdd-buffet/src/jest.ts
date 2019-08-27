/* eslint-disable no-underscore-dangle */
import 'jest';
import execa from 'execa';
import { CoverageMapData, createCoverageMap, FileCoverageData } from 'istanbul-lib-coverage';
import { pathExistsSync } from 'fs-extra';

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

declare global {
  namespace NodeJS {
    interface Global {
      __coverage__: CoverageObject;
    }
  }
}

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
      // @ts-ignore
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
  // @ts-ignore TODO: add global type
  jest.addCoverageFor(filename);
}

export type JestOptions = {
  coverage: boolean,
  maxWorkers: string,
  runInBand: boolean
};

/* istanbul ignore next because this is hard to run through jest because it is running jest */
export async function run(configPath: string, { coverage, maxWorkers, runInBand }: JestOptions) {
  let command = `jest --config ${configPath}`;

  if (coverage) {
    command += ' --coverage';
  }

  if (runInBand) {
    command += ' --runInBand';
  } else {
    command += ` --maxWorkers=${maxWorkers}`;
  }

  await execa.command(command, {
    stdio: 'inherit',
    env: {
      TDD_BUFFET_COVERAGE: coverage ? 'true' : undefined
    }
  });
}
