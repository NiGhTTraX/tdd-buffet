import {
  beforeEach,
  bindBrowser,
  Browser,
  collectCoverage,
  describe,
  it,
  setViewportSize
} from '../src/suite/gui';
import { expect } from '../../tdd-buffet/src/suite/expect';
import { mkdtemp, readFile } from 'fs-extra';
import path from 'path';

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
      async (boundBrowser: Browser, x: number, y: number) => boundBrowser.execute(function(a, b) {
        document.body.textContent = `${a + b}`;
      }, x, y)
    );

    await writeSomeText(1, 2);

    const body = await browser.$('body');
    expect(await body.getText()).to.equal('3');
  });

  it('should collect coverage', async browser => {
    await browser.execute(function() {
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      window.__coverage__ = 'foobar';
    });

    const coveragePath = path.join(await mkdtemp('/tmp/tdd-buffet'), 'foobar.json');

    await collectCoverage(browser, coveragePath);

    expect(await readFile(coveragePath, { encoding: 'utf-8' })).to.equal('foobar');
  });

  it('pending test');

  describe('nested', () => {
    it('should preserve session', async browser => {
      expect(await browser.getUrl()).to.equal('about:blank');
    });
  });
});
