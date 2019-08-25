import { describe, it } from 'tdd-buffet/suite/gui';
import { readFile } from 'fs-extra';
import path from 'path';

describe('Gui coverage', () => {
  it('should cover a never before seen file', async browser => {
    const content = await readFile(
      path.join(__dirname, '../../../tests/coverage/simple-bundle.js'),
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

  it('should cover an already remotely covered file', async browser => {
    const content = await readFile(
      path.join(__dirname, '../../../tests/coverage/simple-bundle.js'),
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
