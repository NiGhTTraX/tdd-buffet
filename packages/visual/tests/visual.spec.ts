import { describe } from 'tdd-buffet/suite/gui';
import { vit } from '../src/index';

describe('Visual suite', () => {
  vit('should take a screenshot of the only child', async (page) => {
    await page.goto('about:blank');

    await page.evaluate(function () {
      document.body.innerHTML = '<span>screenshot</span>';
    });
  });

  vit('should take a screenshot of the first child', async (page) => {
    await page.goto('about:blank');

    await page.evaluate(function () {
      document.body.innerHTML = '<span>1</span><span>2</span>';
    });
  });
});
