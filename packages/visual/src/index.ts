import { PuppeteerAdapter } from '@mugshot/puppeteer';
import { Mugshot } from 'mugshot';
import path from 'path';
import { it, Page, TestDefinition } from 'tdd-buffet/suite/gui';

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
  selector = 'body > *:first-child'
) {
  it(name, async (page, testName) => {
    await definition(page, testName);

    await checkForVisualChanges(page, testName, selector);
  });
}

async function checkForVisualChanges(
  page: Page,
  name: string,
  selector: string
) {
  const adapter = new PuppeteerAdapter(page);

  const mugshot = new Mugshot(
    adapter,
    path.join(process.cwd(), `tests/gui/screenshots`)
  );

  const result = await mugshot.check(getSafeFilename(name), selector);

  /* istanbul ignore next because it's hard to test this through vit */
  if (!result.matches) {
    throw new Error(
      `Visual changes detected. Check diff at '${result.diffName}'`
    );
  }
}

/**
 * Turn the given file name into something that's safe to save on the FS.
 */
function getSafeFilename(fileName: string): string {
  return fileName.replace(/\//g, '_').replace(/ /g, '_').toLowerCase();
}
