> All you can eat delicious TDD helpers, healthy configs, React desserts and TypeScript beverages

[![Build Status](https://travis-ci.com/NiGhTTraX/tdd-buffet.svg?branch=master)](https://travis-ci.com/NiGhTTraX/tdd-buffet) [![codecov](https://codecov.io/gh/NiGhTTraX/tdd-buffet/branch/master/graph/badge.svg)](https://codecov.io/gh/NiGhTTraX/tdd-buffet) ![npm type definitions](https://img.shields.io/npm/types/tdd-buffet.svg)
----

This is a collection of libraries extracted from my personal open source projects. They help me bootstrap new projects easily and keep things consistent between them. You can mix and match as little or as much as you like from the project, and if you have any feature requests or suggestions for improvements please open an issue/PR.


### Today's menu

- [Testing](#testing)
  - [Run the tests](#run-the-tests)
  - [Create a Node test](#create-a-node-test)
  - [Create a GUI test](#create-a-gui-test)
- [Configs](#configs)
  - [TypeScript](#typescript)
  - [Jest](#jest)
- [React](./packages/react)
  - [Render components into a test container](./packages/react/README.md#render-components-into-a-test-container)
- [Selenium](./packages/selenium)
  - [Start a grid with Chrome and Firefox](./packages/selenium/README.md#start-a-grid-with-chrome-and-firefox)
  - [Start a debug grid with VNC](./packages/selenium/README.md#start-a-grid-with-debug-nodes-with-vnc)
  - [Mount files inside the nodes](./packages/selenium/README.md#mount-files-inside-the-nodes)
  - [Connect other containers](./packages/selenium/README.md#connect-other-containers)
  - [Stop everything](./packages/selenium/README.md#stop-everything)
  

## Testing

This package exposes both a way to define tests and a way to run them. The current test runner is [Jest](https://jestjs.io).

### Run the tests

```sh
npx tdd-buffet test
```

This will run all the tests matched by the default [Jest config](#jest). You can pass your own config through the `--config` option.

### Create a Node test

```typescript
import { describe, it, expect } from 'tdd-buffet/suite/node';

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

The suite automatically connects to a running Selenium server (see the [selenium package](./packages/selenium) on how to start one) and gives you a [WebdriverIO](https://webdriver.io) client. Browser name and Selenium host/port are read from the environment variables `BROWSER` and `SELENIUM_HOST` and `SELENIUM_PORT` respectively.


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
