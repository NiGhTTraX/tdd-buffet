/* eslint-disable no-underscore-dangle */
import { remote, BrowserObject, RemoteOptions } from 'webdriverio';
import {
  runnerAfter,
  runnerBefore,
  runnerBeforeEach,
  runnerDescribe,
  runnerIt,
} from '../jest';

/* istanbul ignore next: I'm not going to run the tests twice to cover these */
const {
  BROWSER = 'chrome',
  SELENIUM_HOST = 'localhost',
  SELENIUM_PORT = '4444',
} = process.env;

let suiteNesting = 0;
let rootSuiteBrowser: Browser;

/**
 * You can use this to simplify writing custom functions that work
 * with the browser e.g. navigation helpers.
 *
 * @example
 * ```
 * import { describe, it, bindBrowser, Browser } from 'tdd-buffet/suite/gui';
 *
 * const loadFixture = bindBrowser(
 *   async (browser: Browser, path: string) => await browser.url(`/fixtures/${path}`)
 * );
 *
 * describe('My suite', () => {
 *   it('my test', async browser => {
 *     await loadFixture('foobar');
 *     await browser.click('.something');
 *   });
 * });
 * ```
 */
export function bindBrowser<A extends any[], R>(
  cb: (browser: Browser, ...args: A) => R
) {
  return (...args: A) => cb(rootSuiteBrowser, ...args);
}

export type Browser = BrowserObject;

/**
 * @param browser
 */
export type HookDefinition = (browser: Browser) => Promise<any> | void;

/**
 * @param browser
 * @param testName The full test name including all of its parent `describe` names.
 */
export type TestDefinition = (
  browser: Browser,
  testName: string
) => Promise<any> | void;

/* istanbul ignore next */
function getBrowserChromeSize() {
  return {
    width: window.outerWidth - window.innerWidth,
    height: window.outerHeight - window.innerHeight,
  };
}

/**
 * Set the browser's viewport size.
 *
 * This will take into account the browser's chrome size (toolbars, scrollbars etc.)
 * and set the entire window's size in order to achieve the given viewport size.
 */
export async function setViewportSize(width: number, height: number) {
  const {
    width: chromeWidth,
    height: chromeHeight,
  } = await rootSuiteBrowser.execute(getBrowserChromeSize);

  const actualWidth = width + chromeWidth;
  const actualHeight = height + chromeHeight;

  // Chrome...
  await rootSuiteBrowser.setWindowSize(actualWidth, actualHeight);

  // Firefox...
  try {
    await rootSuiteBrowser.setWindowRect(0, 0, actualWidth, actualHeight);
    // eslint-disable-next-line no-empty
  } catch (e) {}
}

/**
 * Declare a block of tests that will start a fresh Selenium instance. **Mandatory**.
 *
 * Nested blocks will preserve the root session.
 *
 * Tests and hooks will receive the browser instance.
 */
export function describe(name: string, definition: () => void) {
  suiteNesting++;

  runnerDescribe(suiteNesting === 1 ? `${name}:${BROWSER}` : name, () => {
    // We only want to set up hooks once - for the root suite.
    if (suiteNesting === 1) {
      setupHooks();
    }

    definition();
  });

  suiteNesting--;
}

/**
 * Run some set up code before each test in the current `describe` block.
 *
 * @param definition Will receive the browser instance.
 */
export function beforeEach(definition: HookDefinition) {
  runnerBeforeEach(() => definition(rootSuiteBrowser));
}

/**
 * @param definition
 * @param browserName
 */
export function createTest(definition: TestDefinition, browserName: string) {
  return async (testName: string) => {
    const testNameWithoutBrowser = testName.replace(`:${browserName}`, '');

    await definition(rootSuiteBrowser, testNameWithoutBrowser);
  };
}

/**
 * Declare a test.
 *
 * @param name
 * @param definition Omitting this will create a 'pending' test.
 */
export function it(name: string, definition?: TestDefinition) {
  runnerIt(name, definition ? createTest(definition, BROWSER) : undefined);
}

function setupHooks() {
  runnerBefore(async function connectToSelenium() {
    const options: RemoteOptions = {
      hostname: SELENIUM_HOST,
      port: parseInt(SELENIUM_PORT, 10),
      path: '/wd/hub',
      capabilities: { browserName: BROWSER },
      logLevel: 'error',
    };

    rootSuiteBrowser = await remote(options);

    return rootSuiteBrowser;
  });

  runnerAfter(function endSession() {
    return rootSuiteBrowser.deleteSession();
  });
}
