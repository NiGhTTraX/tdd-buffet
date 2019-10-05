import { readFile } from 'fs-extra';
import path from 'path';
import { describe, it } from 'tdd-buffet/suite/gui';

describe('Webpack config', () => {
  it('should instrument for coverage', async browser => {
    const content = await readFile(
      path.join(__dirname, '../coverage/webpack-bundle.js'),
      { encoding: 'utf-8' }
    );

    await browser.url('about:blank');

    // XXX: I'm not sure why passing in content directly fails with
    // SyntaxError: Unexpected end of input
    await browser.execute(`
      ${content}
    `);
  });
});
