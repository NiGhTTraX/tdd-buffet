> Awesome jest config for TypeScript projects

[![Build Status](https://travis-ci.com/NiGhTTraX/tdd-buffet.svg?branch=master)](https://travis-ci.com/NiGhTTraX/tdd-buffet) [![codecov](https://codecov.io/gh/NiGhTTraX/tdd-buffet/branch/master/graph/badge.svg)](https://codecov.io/gh/NiGhTTraX/tdd-buffet)

----

## Install

```sh
npm install @tdd-buffet/jest-config
```

## Usage

The config focuses on providing a good developer experience with TypeScript. Tests are type checked before they are run and certain harmful options in `tsconfing.json` files are turned off. You can extend the config and override it as you see fit.

```js
const baseConfig = require('@tdd-buffet/jest-config');

module.exports = {
  ...baseConfig
};
```
