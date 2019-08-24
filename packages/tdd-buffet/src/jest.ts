// TODO: https://github.com/facebook/jest/pull/7571
import 'jest';
import execa from 'execa';

// TODO: move to config after https://github.com/facebook/jest/pull/8456 ships
const TIMEOUT = 20 * 1000;

export function runnerDescribe(name: string, definition: () => void) {
  describe(name, definition);
}

export function runnerIt(name: string, definition?: (testName: string) => Promise<any>|void) {
  if (definition) {
    // @ts-ignore because @types/jest doesn't expose this
    const test: { getFullName: () => string } = it(
      name,
      () => definition(test.getFullName()),
      TIMEOUT
    );
  } else {
    it.todo(name);
  }
}

export function runnerBeforeEach(definition: () => Promise<any>|void) {
  beforeEach(definition, TIMEOUT);
}

export function runnerAfterEach(definition: () => Promise<any>|void) {
  afterEach(definition, TIMEOUT);
}

export function runnerBefore(definition: () => Promise<any>|void) {
  beforeAll(definition, TIMEOUT);
}

export function runnerAfter(definition: () => Promise<any>|void) {
  afterAll(definition, TIMEOUT);
}

export function registerSourceMap(filename: string) {
  // @ts-ignore
  jest.registerExternalCoverage(filename);
}
export type JestOptions = {
  coverage: boolean,
  maxWorkers: string,
  runInBand: boolean
};

/* istanbul ignore next because this is hard to run through jest because it is running jest */
export async function run(configPath: string, { coverage, maxWorkers, runInBand }: JestOptions) {
  let command = `jest --config ${configPath}`;

  const config = await import(configPath);

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
      TDD_BUFFET_COVERAGE: coverage ? 'true' : undefined,
      // TODO: would be nice if we could get this from Jest
      TDD_BUFFET_ROOT_DIR: config.rootDir || process.cwd()
    }
  });
}
