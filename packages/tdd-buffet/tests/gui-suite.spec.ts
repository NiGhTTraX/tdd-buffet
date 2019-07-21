import { beforeEach, describe, it, setViewportSize } from '../src/suite/gui';
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

  it('pending test');

  describe('nested', () => {
    it('should preserve session', async browser => {
      expect(await browser.getUrl()).to.equal('about:blank');
    });
  });
});
