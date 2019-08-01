import { describe, it } from 'tdd-buffet/suite/gui';
import path from 'path';
import { instrument } from './instrument';

describe('Gui suite', () => {
  it('should collect coverage', async browser => {
    await browser.url('about:blank');

    await browser.execute(await instrument(path.join(__dirname, 'simple.ts')));
  });

  it('should update coverage', async browser => {
    await browser.url('about:blank');

    await browser.execute(await instrument(path.join(__dirname, 'simple.ts')));
  });

  it('should translate paths', async browser => {
    await browser.url('about:blank');

    let content = await instrument(path.join(__dirname, 'docker.ts'));

    // Replace the basedir with a Docker one.
    content = content.replace(
      path.join(__dirname, '../../../..'),
      '/usr/src/app'
    );

    await browser.execute(content);
  });
});
