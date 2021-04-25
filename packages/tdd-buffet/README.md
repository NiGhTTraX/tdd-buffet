> All you can eat TDD tools and libraries

[Build Status](https://github.com/NiGhTTraX/tdd-buffet/workflows/Tests/badge.svg) [![codecov](https://codecov.io/gh/NiGhTTraX/tdd-buffet/branch/master/graph/badge.svg)](https://codecov.io/gh/NiGhTTraX/tdd-buffet) ![npm type definitions](https://img.shields.io/npm/types/@tdd-buffet/react.svg)

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

These tests will spin up [Puppeteer](https://pptr.dev/) in headless mode and pass the `page` instance in the test callback. The browser and page will be set up once per test suite and persisted between individual tests. 

These tests are slower than Node tests. Therefore, you should not rely on them to exhaustively check the correctness of your code. You can start with them to have some basic coverage, but try to make your down to smaller, faster, more focused tests.

```typescript
import { describe, it } from 'tdd-buffet/suite/gui';

describe('Gui suite', () => {
  it('should run a test', async (page) => {
    await page.goto('http://github.com');
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

This will run all the tests matched by the default [Jest config](../jest-config). You can pass your own config through the `--config` option. The command accepts all Jest arguments:

```shell script
npx tdd-buffet test --runInBand tests/my-test.spec.tsx
```

### Coverage

You can pass the `--coverage` option to generate coverage with the options specified in the Jest config.

You can control how coverage is collected (output folder, thresholds etc.) through Jest's coverage options.
