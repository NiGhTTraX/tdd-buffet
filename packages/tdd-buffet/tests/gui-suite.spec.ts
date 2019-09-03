import { expect } from 'tdd-buffet/expect/chai';
import { beforeEach, bindBrowser, Browser, describe, it, setViewportSize } from '../src/suite/gui';

describe('Gui suite', () => {
  beforeEach(async browser => {
    await browser.url('about:blank');
  });

  it('should set viewport size', async browser => {
    await browser.url('about:blank');
    await setViewportSize(600, 600);

    function getViewportSize() {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      };
    }

    const viewportSize = await browser.execute(getViewportSize);

    expect(viewportSize).to.deep.equal({ width: 600, height: 600 });
  });

  // Keep this here to test the closure over rootSuiteBrowser.
  const writeSomeText = bindBrowser(
    async (boundBrowser: Browser, x: number, y: number) => boundBrowser.execute(function(a, b) {
      document.body.textContent = `${a + b}`;
    }, x, y)
  );

  it('should bind the browser to a helper', async browser => {
    await writeSomeText(1, 2);

    const body = await browser.$('body');
    expect(await body.getText()).to.equal('3');
  });

  it('pending test');

  describe('nested', () => {
    it('should preserve session', async browser => {
      expect(await browser.getUrl()).to.equal('about:blank');
    });
  });
});
