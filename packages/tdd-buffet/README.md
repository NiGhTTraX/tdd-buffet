> All you can eat TDD tools and libraries

[![Build Status](https://travis-ci.com/NiGhTTraX/tdd-buffet.svg?branch=master)](https://travis-ci.com/NiGhTTraX/tdd-buffet) [![codecov](https://codecov.io/gh/NiGhTTraX/tdd-buffet/branch/master/graph/badge.svg)](https://codecov.io/gh/NiGhTTraX/tdd-buffet) ![npm type definitions](https://img.shields.io/npm/types/@tdd-buffet/react.svg)

----

## Install

```sh
npm install tdd-buffet
```


## Testing

This package exposes a wrapper over [Jest](https://jestjs.io) that provides the same building blocks for writing tests (`describe` and `it`) and also provides the same CLI.

### Create a Node test

Ideally you should have many of these since they're fast to run. They execute in a [jsdom](https://github.com/jsdom/jsdom) environment so you can test both your Node libraries and your [React components](../react/README.md). Since they're fast, you should use them to check your code's correctness and achieve satisfactory coverage.

```typescript
import { describe, it } from 'tdd-buffet/suite/node';
import { expect } from 'tdd-buffet/suite/chai';

describe('Node suite', () => {
  it('should run a test', () => {
    expect(1).to.equal(1); 
  });
});
```

### Create a GUI test

These tests give you a [WebdriverIO](https://webdriver.io) client that connects to a Selenium server (see the [selenium package](../selenium) on how to start one). Browser name and Selenium host/port are read from the environment variables `BROWSER` and `SELENIUM_HOST` and `SELENIUM_PORT` respectively.

These tests are slower than Node tests. Therefore, you should not rely on them to exhaustively check the correctness of your code. You can start with them to have some basic coverage, but try to make your down to smaller, faster, more focused tests.

```typescript
import { describe, it } from 'tdd-buffet/suite/gui';

describe('Gui suite', () => {
  it('should run a test', async browser => {
    await browser.url('http://github.com');
  });
});
```

### Assertions

You can choose between [jest's](https://jestjs.io/docs/en/expect) builtin assertions or [chai's](https://www.chaijs.com/) assertions.

```typescript
import { describe, it } from 'tdd-buffet/suite/node';
import { expect as chaiExpect } from 'tdd-buffet/expect/chai';
import { expect as jestExpect } from 'tdd-buffet/expect/jest';

describe('Expect', () => {
  describe('chai', () => {
    it('should compare things', () => {
      chaiExpect(1).to.equal(1);
      chaiExpect({ foo: 'bar' }).to.deep.equal({ foo: 'bar' });
    });
  });

  describe('jest', () => {
    it('should compare things', () => {
      jestExpect(1).toEqual(1);
      jestExpect({ foo: 'bar' }).toEqual({ foo: 'bar' });
    });
  });
});
```

### Run the tests

```sh
npx tdd-buffet test
```

This will run all the tests matched by the default [Jest config](#jest). You can pass your own config through the `--config` option. The command accepts all Jest arguments:

```shell script
npx tdd-buffet test --runInBand tests/my-test.spec.tsx
```

### Coverage

You can pass the `--coverage` option to generate coverage with the options specified in the Jest config.

Moreover, if you set the `GUI_COVERAGE` environment variable, then the GUI tests will collect **coverage from within the browser**. This requires your code to be instrumented with [istanbul](https://github.com/istanbuljs/babel-plugin-istanbul) and to be **transpiled in the same way Jest would do it**. The [Webpack config](../react/README.md#webpack) in the react package takes care of everything for you.

When you instrument the files make sure to do it from the **same path as your project** because the path will be injected into the coverage data and it will be used when creating the coverage report. If you're instrumenting the files inside a Docker container you can put them in `/usr/src/app` and `tdd-buffet` will map that path to Jest's `rootDir`.

You can control how coverage is collected (output folder, thresholds etc.) through Jest's coverage options.


## Configs

### TypeScript

The config provides sane defaults for both library and app developers. No `jsx` option is specified so if you're working in a React app you need to turn that on yourself.

```json
{
  "extends": "tdd-buffet/config/tsconfig.json",

  "compilerOptions": {
    "jsx": "react"
  }
}
```

### Jest

The config is focused on providing a good developer experience with TypeScript. Tests are type checked before they are run and certain harmful options in `tsconfing.json` files are turned off. You can always inspect the config and override it.

```js
const baseConfig = require('tdd-buffet/config/jest.config.js');

module.exports = {
  ...baseConfig
};
```
