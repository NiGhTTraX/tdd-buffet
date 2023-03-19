// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import { run as runJest } from 'jest';

const testSuiteNameStack: string[] = [];

/**
 * Declare a block of tests.
 *
 * You can have nested blocks. You don't need a block in order to define tests.
 */
export function runnerDescribe(name: string, definition: () => void) {
  testSuiteNameStack.push(name);

  describe(name, definition);

  testSuiteNameStack.pop();
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
  definition?: (testName: string) => Promise<unknown> | void
) {
  const testFullName = [...testSuiteNameStack, name].join(' ');

  if (definition) {
    it(
      name,
      // @ts-expect-error because `definition` returns a union, and `it` is overloaded
      () => definition(testFullName)
    );
  } else {
    it.todo(name);
  }
}

/**
 * Run some set up code before each test in the current `describe` block.
 */
export function runnerBeforeEach(definition: () => Promise<unknown> | void) {
  beforeEach(definition);
}

/**
 * Run some tear down code after each test in the current `describe` block.
 */
export function runnerAfterEach(definition: () => Promise<unknown> | void) {
  afterEach(definition);
}

/**
 * Run some set up code __once__ before all the tests in the current `describe` block.
 */
export function runnerBefore(definition: () => Promise<unknown> | void) {
  beforeAll(definition);
}

/**
 * Run some tear down code __once__ after all the tests in the current `describe` block.
 */
export function runnerAfter(definition: () => Promise<unknown> | void) {
  afterAll(definition);
}

/* istanbul ignore next because this is hard to run through jest because it is running jest */
export async function run(argv: string[]) {
  // Push our config if there isn't one specified.
  if (!argv.includes('--config')) {
    argv.push('--config', require.resolve('@tdd-buffet/jest-config'));
  }

  return runJest(argv);
}
