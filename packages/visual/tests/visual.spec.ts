import { describe, beforeEach } from 'tdd-buffet/suite/gui';
import { vit } from '../src/index';

describe('Visual suite', () => {
  beforeEach((page) => page.goto('about:blank'));

  vit('should take a screenshot of the only child', async (page) => {
    await page.evaluate(function () {
      document.body.innerHTML = `
<div style="width: 100px; height: 100px; background-color: red"/>
`;
    });
  });

  vit('should take a screenshot of the first child', async (page) => {
    await page.evaluate(function () {
      document.body.innerHTML = `
<div style="width: 100px; height: 100px; background-color: green"></div>
<div style="width: 100px; height: 100px; background-color: blue"></div>
`;
    });
  });

  vit(
    'should take a screenshot of the second child',
    async (page) => {
      await page.evaluate(function () {
        document.body.innerHTML = `
<div style="width: 100px; height: 100px; background-color: green"/>
<div data-testid="second" style="width: 100px; height: 100px; background-color: blue"/>
`;
      });
    },
    '[data-testid="second"]'
  );
});
