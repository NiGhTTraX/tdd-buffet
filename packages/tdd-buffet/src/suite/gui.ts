/* eslint-disable no-underscore-dangle */
import puppeteer, {
  Browser,
  BrowserLaunchArgumentOptions,
  LaunchOptions,
  Page,
} from 'puppeteer';
import {
  runnerAfter,
  runnerBefore,
  runnerBeforeEach,
  runnerDescribe,
  runnerIt,
} from '../jest';

export type { Page };

type PuppeteerOptions = LaunchOptions & BrowserLaunchArgumentOptions;

let suiteNesting = 0;
let rootSuiteBrowser: Browser;
let rootSuitePage: Page;

/**
 * You can use this to simplify writing custom functions that work
 * with the browser e.g. navigation helpers.
 *
 * @example
 * ```
 * import { describe, it, bindPage, Page } from 'tdd-buffet/suite/gui';
 *
 * const loadFixture = bindPage(
 *   async (page: Page, path: string) => await page.url(`/fixtures/${path}`)
 * );
 *
 * describe('My suite', () => {
 *   it('my test', async (page) => {
 *     await loadFixture('foobar');
 *     await page.click('.something');
 *   });
 * });
 * ```
 */
export function bindPage<A extends unknown[], R>(
  cb: (page: Page, ...args: A) => R
) {
  return (...args: A) => cb(rootSuitePage, ...args);
}

export type HookDefinition = (page: Page) => Promise<unknown> | void;

/**
 * @param page
 * @param testName The full test name including all of its parent `describe` names.
 */
export type TestDefinition = (
  page: Page,
  testName: string
) => Promise<unknown> | void;

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
  const { width: chromeWidth, height: chromeHeight } =
    await rootSuitePage.evaluate(getBrowserChromeSize);

  const actualWidth = width + chromeWidth;
  const actualHeight = height + chromeHeight;

  await rootSuitePage.setViewport({ width: actualWidth, height: actualHeight });
}

/**
 * Declare a block of tests that will spin up Puppeteer.
 *
 * You need to wrap individual tests with this in order to start the browser.
 *
 * Nested blocks will preserve the root session.
 *
 * Tests and hooks will receive the page instance.
 *
 * @param name
 * @param definition
 * @param options Puppeteer launch options.
 */
export function describe(
  name: string,
  definition: () => void,
  options?: PuppeteerOptions
) {
  suiteNesting++;

  runnerDescribe(name, () => {
    // We only want to set up hooks once - for the root suite.
    if (suiteNesting === 1) {
      setupHooks(options);
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
  runnerBeforeEach(() => definition(rootSuitePage));
}

export function createTest(definition: TestDefinition) {
  return async (testName: string) => {
    await definition(rootSuitePage, testName);
  };
}

/**
 * Declare a test.
 *
 * @param name
 * @param definition Omitting this will create a 'pending' test.
 */
export function it(name: string, definition?: TestDefinition) {
  runnerIt(name, definition ? createTest(definition) : undefined);
}

function setupHooks(options?: PuppeteerOptions) {
  runnerBefore(async function startBrowser() {
    rootSuiteBrowser = await puppeteer.launch(options);
    rootSuitePage = await rootSuiteBrowser.newPage();

    return rootSuitePage;
  });

  runnerAfter(function endSession() {
    return rootSuiteBrowser.close();
  });
}
