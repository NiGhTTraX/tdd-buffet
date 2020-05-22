> Awesome webpack config for TypeScript + React projects

[![Build Status](https://travis-ci.com/NiGhTTraX/tdd-buffet.svg?branch=master)](https://travis-ci.com/NiGhTTraX/tdd-buffet) [![codecov](https://codecov.io/gh/NiGhTTraX/tdd-buffet/branch/master/graph/badge.svg)](https://codecov.io/gh/NiGhTTraX/tdd-buffet)

----

## Install

```sh
npm install @tdd-buffet/webpack-config
```

## Usage

```js
const baseConfig = require('@tdd-buffet/webpack-config');

module.exports = {
  ...baseConfig
}
```

Setting `COVERAGE=1` in your environment will instrument your code for coverage and is needed to [aggregate reports](../tdd-buffet/README.md#coverage).
