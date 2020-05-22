import { readFile } from 'fs-extra';
import path from 'path';
import { describe, it } from 'tdd-buffet/suite/gui';

describe('Coverage', () => {
  it('should instrument for coverage', async (browser) => {
    const content = await readFile(
      path.join(__dirname, './coverage/webpack-bundle.js'),
      { encoding: 'utf-8' }
    );

    await browser.url('about:blank');
    await browser.execute(`
      var div = document.createElement('div');
      div.id = 'root';
      document.body.appendChild(div);
      
      ${content}
    `);
  });
});
