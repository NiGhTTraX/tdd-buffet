import { writeFile } from 'fs-extra';
import path from 'path';
import { beforeEach, Browser, describe, it } from 'tdd-buffet/suite/gui';
import { afterEach } from 'tdd-buffet/suite/node';

describe('Webpack config', () => {
  async function waitForFoo(browser: Browser, value: string) {
    const body = await browser.$('body');
    await browser.waitUntil(async () => await body.getText() === `foo: ${value}`);
  }

  async function writeData(data: string) {
    // TODO: this is a comitted file; figure out how to write to tmp file and expose it to Docker
    await writeFile(path.join(__dirname, 'data.js'), `// eslint-disable
module.exports = ${data};
`);
  }

  beforeEach(async browser => {
    await writeData('1');
    await browser.url('http://webpack:3000');
    await waitForFoo(browser, '1');
  });

  // TODO: import from suite/gui
  afterEach(async () => {
    await writeData('1');
  });

  it('should enable hot reload', async browser => {
    await writeData('23');

    await waitForFoo(browser, '23');
  });

  it('should hot reload without a page refresh', async browser => {
    await browser.execute(function() {
      window.addEventListener('unload', function() {
        // eslint-disable-next-line no-alert
        alert('now hold up');
      });
    });

    await writeData('23');

    await waitForFoo(browser, '23');
  });
});
