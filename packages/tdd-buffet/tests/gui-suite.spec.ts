import { expect } from 'tdd-buffet/expect/chai';
import {
  beforeEach,
  bindPage,
  Page,
  describe,
  it,
  setViewportSize,
} from '../src/suite/gui';

describe('Gui suite', () => {
  beforeEach(async (page) => {
    await page.goto('about:blank');
  });

  it('should set viewport size', async (page) => {
    await page.goto('about:blank');
    await setViewportSize(600, 600);

    function getViewportSize() {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      };
    }

    const viewportSize = await page.evaluate(getViewportSize);

    expect(viewportSize).to.deep.equal({ width: 600, height: 600 });
  });

  // Keep this here to test the closure over rootSuitePage.
  const writeSomeText = bindPage(async (page: Page, x: number, y: number) =>
    page.evaluate(
      function (a: number, b: number) {
        document.body.textContent = `${a + b}`;
      },
      x,
      y
    )
  );

  it('should bind the page to a helper', async (page) => {
    await writeSomeText(1, 2);

    const body = await page.$('body');
    expect(
      await (await body?.getProperty('textContent'))?.jsonValue()
    ).to.equal('3');
  });

  it('pending test');

  describe('nested', () => {
    it('should preserve session', async (page) => {
      expect(await page.url()).to.equal('about:blank');
    });
  });
});
