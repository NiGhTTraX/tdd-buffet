// TODO: https://github.com/facebook/jest/pull/7571
import 'jest';
import execa from 'execa';

// TODO: move to config after https://github.com/facebook/jest/pull/8456 ships
const TIMEOUT = 20 * 1000;

export function runnerDescribe(name: string, definition: () => void) {
  describe(name, definition);
}

export function runnerIt(name: string, definition?: () => Promise<any>|void) {
  if (definition) {
    it(name, definition, TIMEOUT);
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

export type JestOptions = {
  coverage: boolean,
  maxWorkers: string,
  runInBand: boolean
};

/* istanbul ignore next because this is hard to run through jest because it is running jest */
export async function run(config: string, { coverage, maxWorkers, runInBand }: JestOptions) {
  let command = `jest --config ${config} --maxWorkers=${maxWorkers}`;

  if (coverage) {
    command += ' --coverage';
  }

  if (runInBand) {
    command += ' --runInBand';
  }

  // eslint-disable-next-line no-console
  console.log(command);
  await execa.command(command, { stdio: 'inherit' });
}
