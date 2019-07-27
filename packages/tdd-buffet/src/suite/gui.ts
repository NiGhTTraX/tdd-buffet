import { remote } from 'webdriverio';
import { runnerAfter, runnerBefore, runnerBeforeEach, runnerDescribe, runnerIt } from '../jest';
import { outputFile } from 'fs-extra';
import path from 'path';

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
export function bindBrowser<A extends any[], R>(cb: (browser: Browser, ...args: A) => R) {
  return cb.bind(null, rootSuiteBrowser);
}

export type Browser = ReturnType<typeof remote>;
export type HookDefinition = (browser: Browser) => Promise<any> | void;
export type TestDefinition = (browser: Browser, testName: string) => Promise<any> | void;

/* istanbul ignore next */
function getBrowserChromeSize() {
  return {
    width: window.outerWidth - window.innerWidth,
    height: window.outerHeight - window.innerHeight
  };
}

/* istanbul ignore next because it's stringified and sent to the browser */
function getCoverage() {
  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  return window.__coverage__;
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

export function beforeEach(definition: HookDefinition) {
  runnerBeforeEach(() => definition(rootSuiteBrowser));
}

/**
 * If process.env.TDD_BUFFET_COVERAGE is truthy then the istanbul coverage
 * report will be read from inside the browser and written to
 * `tests/gui/results/${fullTestName}.json`.
 */
export function it(name: string, definition?: TestDefinition) {
  runnerIt(name, definition
    ? async testName => {
      const testNameWithoutBrowser = testName.replace(`:${BROWSER}`, '');

      await definition(rootSuiteBrowser, testNameWithoutBrowser);

      /* istanbul ignore else because when ran in CI this will always be true */
      if (process.env.TDD_BUFFET_COVERAGE) {
        await collectCoverage(
          rootSuiteBrowser,
          path.join(
            process.cwd(),
            `tests/gui/results/${BROWSER}_${getSafeFilename(testNameWithoutBrowser)}.json`
          )
        );
      }
    }
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

export async function collectCoverage(browser: Browser, coveragePath: string) {
  const coverage = await browser.execute(getCoverage);

  await outputFile(coveragePath, coverage);
}

/**
 * Turn the given file name into something that's safe to save on the FS.
 */
function getSafeFilename(fileName: string): string {
  return fileName
    .replace(/\//g, '_')
    .replace(/ /g, '_')
    .toLowerCase();
}
