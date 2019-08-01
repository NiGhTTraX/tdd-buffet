> All you can eat TDD tools and libraries

[![Build Status](https://travis-ci.com/NiGhTTraX/tdd-buffet.svg?branch=master)](https://travis-ci.com/NiGhTTraX/tdd-buffet) [![codecov](https://codecov.io/gh/NiGhTTraX/tdd-buffet/branch/master/graph/badge.svg)](https://codecov.io/gh/NiGhTTraX/tdd-buffet) ![npm type definitions](https://img.shields.io/npm/types/tdd-buffet.svg)

----

## Install

```sh
npm install tdd-buffet
```


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

#### Coverage

You can pass the `--coverage` option to generate coverage with the options specified in the Jest config.

Moreover, the GUI tests will collect **coverage from within the browser**. This requires your code to be instrumented with [istanbul](https://github.com/istanbuljs/babel-plugin-istanbul) and to be **transpiled in the same way Jest would do it**. For example a `ts-jest` Jest environment translates to `ts-loader` + `babel-loader` with `babel-plugin-istanbul` for Webpack. Make sure the transpiling options are identical between the two.

Since the instrumented files inside the browser might have different path names, tdd-buffet will try to map the coverage reports to the correct host paths. Right now there is only 1 transformation done: the files are assumed to be inside a Docker container at `/usr/src/app` so that path is replaced with Jest's `rootDir`.


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
