import { beforeEach, bindBrowser, Browser, describe, it, setViewportSize } from '../src/suite/gui';
import { expect } from '../../tdd-buffet/src/suite/expect';

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

  it('should bind the browser to a helper', async browser => {
    const writeSomeText = bindBrowser(
      async (boundBrowser: Browser, text: string) => boundBrowser.execute(function(t: string) {
        document.body.textContent = t;
      }, text)
    );

    await writeSomeText('foobar');

    const body = await browser.$('body');
    expect(await body.getText()).to.equal('foobar');
  });

  it('pending test');

  describe('nested', () => {
    it('should preserve session', async browser => {
      expect(await browser.getUrl()).to.equal('about:blank');
    });
  });
});
