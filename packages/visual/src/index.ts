import { Browser, it, TestDefinition } from 'tdd-buffet/suite/gui';
import Mugshot from 'mugshot';
import WebdriverIOAdapter from '@mugshot/webdriverio';
import path from 'path';

const { BROWSER = 'chrome' } = process.env;

/**
 * Perform a visual test alongside a normal test.
 *
 * The visual test will not be performed if the test in `definition` fails.
 *
 * @param name The name of the test. The screenshot will be taken under
 *   the full test name (including any parent suite's name(s)).
 * @param definition
 * @param selector Defaults to the first child of body.
 */
export function vit(name: string, definition: TestDefinition, selector:string = 'body > *') {
  it(name, async (browser, testName) => {
    await definition(browser, testName);

    await checkForVisualChanges(browser, testName, selector);
  });
}

async function checkForVisualChanges(browser: Browser, name: string, selector: string) {
  const adapter = new WebdriverIOAdapter(browser);

  const mugshot = new Mugshot(
    adapter,
    path.join(process.cwd(), `tests/gui/screenshots/${BROWSER}`)
  );

  const result = await mugshot.check(
    getSafeFilename(name), selector
  );

  /* istanbul ignore next because it's hard to test this through vit */
  if (!result.matches) {
    throw new Error('Visual changes detected. Check screenshots');
  }
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
