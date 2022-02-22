> Awesome jest config for TypeScript projects

[Build Status](https://github.com/NiGhTTraX/tdd-buffet/workflows/Tests/badge.svg) [![codecov](https://codecov.io/gh/NiGhTTraX/tdd-buffet/branch/master/graph/badge.svg)](https://codecov.io/gh/NiGhTTraX/tdd-buffet)

----

## Intro

The config focuses on providing a good developer experience with TypeScript. Tests are type checked before they are run using [ts-jest](https://github.com/kulshekhar/ts-jest).

## Install

```sh
npm install @tdd-buffet/jest-config
```

## Usage

The config itself is written in TypeScript and published with types, so you can have a `jest.config.ts` file where you import the package and apply your overrides. Just make sure to have [ts-node](https://www.npmjs.com/package/ts-node) installed.

```typescript
import baseConfig from '@tdd-buffet/jest-config';

export default {
  ...baseConfig,
  /* your overrides here */
};
```

You can also use it from a JavaScript `jest.config.js` file with `require()`.
