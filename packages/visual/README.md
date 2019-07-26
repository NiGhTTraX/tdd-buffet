> Visual testing add-on for [tdd-buffet](https://github.com/NiGhTTraX/tdd-buffet) using [Mugshot](https://github.com/NiGhTTraX/mugshot)

[![Build Status](https://travis-ci.com/NiGhTTraX/tdd-buffet.svg?branch=master)](https://travis-ci.com/NiGhTTraX/tdd-buffet) [![codecov](https://codecov.io/gh/NiGhTTraX/tdd-buffet/branch/master/graph/badge.svg)](https://codecov.io/gh/NiGhTTraX/tdd-buffet) ![npm type definitions](https://img.shields.io/npm/types/@tdd-buffet/visual.svg)

----

## Install

```sh
npm install tdd-buffet @tdd-buffet/visual
```


## Create a visual test

```typescript
import { describe } from 'tdd-buffet/suite/gui';
import { vit } from '@tdd-buffet/visual';

describe('Visual suite', () => {
  vit('screenshot name', async browser => {
    await browser.url('http://www.github.com');
  });
});
```

The above will take a screenshot of the first child in `body` and save it at `tests/gui/screenshots/${browser}/${fullTestName}.png` (relative to cwd) where 
- `browser` is the name of the browser taken from `process.env.BROWSER` (see [writing GUI tests](../../packages/tdd-buffet/README.md#create-a-gui-test) for more details),
- `fullTestName` is the full name of the `vit` test including all parent `describe` block names (in this case `visual_suite_screenshot_name`).

You can mix and match "normal" tests (`it`) and visual tests (`vit`) and only the visual ones will result in screenshots being taken.
