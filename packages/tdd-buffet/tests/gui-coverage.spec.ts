import { readFile } from 'fs-extra';
import path from 'path';
import { describe, it } from 'tdd-buffet/suite/gui';

describe('Gui coverage', () => {
  it('should cover a never before seen file', async browser => {
    const content = await readFile(
      path.join(__dirname, './coverage/simple-bundle.js'),
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
      path.join(__dirname, './coverage/simple-bundle.js'),
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

  it('should not cover an ignored file', async browser => {
    const content = await readFile(
      path.join(__dirname, './coverage/ignored-bundle.js'),
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
