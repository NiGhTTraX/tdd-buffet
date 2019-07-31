import { describe, it } from 'tdd-buffet/suite/gui';
import path from 'path';
import { instrument } from './instrument';

describe('Gui suite', () => {
  it('should collect coverage', async browser => {
    await browser.url('about:blank');

    await browser.execute(await instrument(path.join(__dirname, 'original.ts')));
  });

  it('should update coverage', async browser => {
    await browser.url('about:blank');

    await browser.execute(await instrument(path.join(__dirname, 'original.ts')));
  });
});
