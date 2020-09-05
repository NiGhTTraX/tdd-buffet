import WebdriverIOAdapter from '@mugshot/webdriverio';
import Mugshot, { WebdriverScreenshotter } from 'mugshot';
import FsStorage from 'mugshot/dist/lib/fs-storage';
import path from 'path';
import { Browser, it, TestDefinition } from 'tdd-buffet/suite/gui';

const { BROWSER = 'chrome' } = process.env;

/**
 * Perform a visual test alongside a normal test.
 *
 * The visual test will not be performed if `definition` throws.
 *
 * @param name The name of the test. The screenshot will be taken under
 *   the full test name (including any parent suite's name(s)).
 * @param definition
 * @param selector Defaults to the first child of body.
 */
export function vit(
  name: string,
  definition: TestDefinition,
  selector: string = 'body > *:first-child'
) {
  it(name, async (browser, testName) => {
    await definition(browser, testName);

    await checkForVisualChanges(browser, testName, selector);
  });
}

async function checkForVisualChanges(
  browser: Browser,
  name: string,
  selector: string
) {
  const adapter = new WebdriverIOAdapter(browser);

  const mugshot = new Mugshot(
    new WebdriverScreenshotter(adapter),
    new FsStorage(path.join(process.cwd(), `tests/gui/screenshots/${BROWSER}`))
  );

  const result = await mugshot.check(getSafeFilename(name), selector);

  /* istanbul ignore next because it's hard to test this through vit */
  if (!result.matches) {
    throw new Error('Visual changes detected. Check screenshots');
  }
}

/**
 * Turn the given file name into something that's safe to save on the FS.
 */
function getSafeFilename(fileName: string): string {
  return fileName.replace(/\//g, '_').replace(/ /g, '_').toLowerCase();
}
