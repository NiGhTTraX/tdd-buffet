[![Build Status](https://travis-ci.com/NiGhTTraX/tdd-buffet.svg?branch=master)](https://travis-ci.com/NiGhTTraX/tdd-buffet) [![codecov](https://codecov.io/gh/NiGhTTraX/tdd-buffet/branch/master/graph/badge.svg)](https://codecov.io/gh/NiGhTTraX/tdd-buffet) ![npm type definitions](https://img.shields.io/npm/types/tdd-buffet.svg)

----

## Testing

This package exposes both a way to define tests and a way to run them. The current test runner is [Jest](https://jestjs.io).

### Run the tests

```sh
npx tdd-buffet test
```

This will run all the tests matched by the default [Jest config](#jest). You can pass your own config through the `--config` option.

### Create a Node test

```typescript
import { describe, it } from 'tdd-buffet/suite/node';
import { expect } from 'tdd-buffet/suite/expect';

describe('Node suite', () => {
  it('should run a test', () => {
    expect(1).to.equal(1); 
  });
});
```

The `expect` assertion helper is [Chai](https://www.chaijs.com/).

### Create a GUI test

```typescript
import { describe, it } from 'tdd-buffet/suite/gui';

describe('Gui suite', () => {
  it('should run a test', async browser => {
    await browser.url('http://github.com');
  });
});
```

The suite automatically connects to a running Selenium server (see the [selenium package](../selenium) on how to start one) and gives you a [WebdriverIO](https://webdriver.io) client. Browser name and Selenium host/port are read from the environment variables `BROWSER` and `SELENIUM_HOST` and `SELENIUM_PORT` respectively.


## Configs

### TypeScript

```json
{
  "extends": "tdd-buffet/config/tsconfig.json"
}
```

### Jest

```js
const baseConfig = require('tdd-buffet/config/jest.config.js');

module.exports = {
  ...baseConfig
};
```

### ESLint

See [NiGhTTraX/eslint-config](https://github.com/NiGhTTraX/eslint-config). They're not included here because the monorepo's path aliases don't work inside the `extend` option of the configs.


## Linting

```sh
npx tdd-buffet lint
```
