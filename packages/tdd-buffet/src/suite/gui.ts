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

export function createTest(
  definition: TestDefinition,
  coverage: boolean,
  coverageDir: string,
  browserName: string
) {
  return async (testName: string) => {
    const testNameWithoutBrowser = testName.replace(`:${browserName}`, '');

    await definition(rootSuiteBrowser, testNameWithoutBrowser);

    /* istanbul ignore else because when ran in CI this will always be true */
    if (coverage) {
      await collectCoverage(path.join(
        coverageDir,
        'gui',
        browserName,
        `${getSafeFilename(testNameWithoutBrowser)}.json`
      ));
    }
  };
}

/**
 * If the --config option is passed to Jest then the istanbul coverage
 * report will be read from inside the browser and written to
 * `${coverageDirectory}/gui/${browser}/${fullTestName}.json` where
 * `coverageDirectory` is read from the Jest config.
 */
export function it(name: string, definition?: TestDefinition) {
  runnerIt(name, definition
    ? createTest(
      definition,
      !!process.env.TDD_BUFFET_COVERAGE,
      process.env.TDD_BUFFET_COVERAGE_DIR!,
      BROWSER
    )
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

async function collectCoverage(coveragePath: string) {
  const coverage = await rootSuiteBrowser.execute(getCoverage);

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
