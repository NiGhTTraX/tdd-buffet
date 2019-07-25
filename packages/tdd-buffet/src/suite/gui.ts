import { remote } from 'webdriverio';
import { runnerAfter, runnerBefore, runnerBeforeEach, runnerDescribe, runnerIt } from '../jest';

const { BROWSER = 'chrome', SELENIUM_HOST = 'localhost', SELENIUM_PORT = '4444' } = process.env;

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
export function bindBrowser<A extends any[], R>(cb: (browser: Browser, ...args: A) => Promise<R>) {
  return cb.bind(null, rootSuiteBrowser);
}

export type Browser = ReturnType<typeof remote>;
export type TestDefinition = (browser: Browser) => Promise<any> | void;

/* istanbul ignore next */
function getBrowserChromeSize() {
  return {
    width: window.outerWidth - window.innerWidth,
    height: window.outerHeight - window.innerHeight
  };
}

export async function setViewportSize(width: number, height: number) {
  const {
    // @ts-ignore because the return type is not properly inferred
    width: chromeWidth,
    // @ts-ignore
    height: chromeHeight
  } = await rootSuiteBrowser.execute(getBrowserChromeSize);

  const actualWidth = width + chromeWidth;
  const actualHeight = height + chromeHeight;

  // Chrome...
  await rootSuiteBrowser.setWindowSize(actualWidth, actualHeight);

  // Firefox...
  try {
    await rootSuiteBrowser.setWindowRect(0, 0, actualWidth, actualHeight);
    // eslint-disable-next-line no-empty
  } catch (e) {
  }
}

/**
 * Run your gui tests in a fresh Selenium session.
 *
 * Nested calls will preserve the root session.
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

export function beforeEach(definition: TestDefinition) {
  runnerBeforeEach(() => definition(rootSuiteBrowser));
}

export function it(name: string, definition?: TestDefinition) {
  runnerIt(name, definition
    ? () => Promise.resolve(definition(rootSuiteBrowser))
    : undefined);
}

function setupHooks() {
  runnerBefore(async function connectToSelenium() {
    const options: WebDriver.Options = {
      hostname: SELENIUM_HOST,
      port: parseInt(SELENIUM_PORT, 10),
      capabilities: { browserName: BROWSER },
      logLevel: 'error'
    };

    rootSuiteBrowser = await remote(options);

    return rootSuiteBrowser;
  });

  runnerAfter(function endSession() {
    return rootSuiteBrowser.deleteSession();
  });
}
