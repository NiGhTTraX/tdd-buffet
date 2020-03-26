> Awesome jest config for TypeScript apps

[![Build Status](https://travis-ci.com/NiGhTTraX/tdd-buffet.svg?branch=master)](https://travis-ci.com/NiGhTTraX/tdd-buffet) [![codecov](https://codecov.io/gh/NiGhTTraX/tdd-buffet/branch/master/graph/badge.svg)](https://codecov.io/gh/NiGhTTraX/tdd-buffet) ![npm type definitions](https://img.shields.io/npm/types/@tdd-buffet/jest-config.svg)

----

## Install

```sh
npm install @tdd-buffet/jest-config
```

## Usage

The config is focused on providing a good developer experience with TypeScript. Tests are type checked before they are run and certain harmful options in `tsconfing.json` files are turned off. You can always inspect the config and override it.

```js
const baseConfig = require('@tdd-buffet/jest-config');

module.exports = {
  ...baseConfig
};
```
