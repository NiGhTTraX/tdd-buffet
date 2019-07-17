> All you can eat delicious TDD helpers, healthy configs, React desserts and TypeScript beverages

[![Build Status](https://travis-ci.com/NiGhTTraX/tdd-buffet.svg?branch=master)](https://travis-ci.com/NiGhTTraX/tdd-buffet) [![codecov](https://codecov.io/gh/NiGhTTraX/tdd-buffet/branch/master/graph/badge.svg)](https://codecov.io/gh/NiGhTTraX/tdd-buffet) ![npm type definitions](https://img.shields.io/npm/types/tdd-buffet.svg)
----

### Today's menu

- [Test suites](#test-suites)
  - [Node](#node)
  - [GUI](#gui)
- [Configs](#configs)
  - [TypeScript](#typescript)
  - [Jest](#jest)
- [React](./packages/react)
  - [Render components into a test container](./packages/react/README.md#render-components-into-a-test-container)
- [Selenium](./packages/selenium)
  - [Start a grid with Chrome and Firefox](./packages/selenium/README.md#start-a-grid-with-chrome-and-firefox)
  - [Start a debug grid with VNC](./packages/selenium/README.md#start-a-grid-with-debug-nodes-with-vnc)
  - [Stop everything](./packages/selenium/README.md#stop-everything)
  

## Test suites

### Node

Create a Jest test suite with Chai assertions:

```typescript
import { describe, it, expect } from 'tdd-buffet/suite/node';

describe('Node suite', () => {
  it('should run a test', () => {
    expect(1).to.equal(1); 
  });
});
```

### GUI

Create a Jest suite that automatically starts a Selenium session. Browser name and selenium host are read from the environment variables `BROWSER` and `SELENIUM_HOST` respectively.

```typescript
import { describe, it } from 'tdd-buffet/suite/gui';

describe('Gui suite', () => {
  it('should run a test', async browser => {
    await browser.url('http://github.com');
  });
});
```


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
