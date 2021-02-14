> Awesome TypeScript config

[Build Status](https://github.com/NiGhTTraX/tdd-buffet/workflows/Tests/badge.svg) [![codecov](https://codecov.io/gh/NiGhTTraX/tdd-buffet/branch/master/graph/badge.svg)](https://codecov.io/gh/NiGhTTraX/tdd-buffet)

----

## Install

```sh
npm install @tdd-buffet/tsconfig
```

## Usage

```json
{
  "extends": "@tdd-buffet/tsconfig",

  "compilerOptions": {
    "jsx": "react"
  }
}
```

The config provides sane defaults for both library and app developers. No `jsx` option is specified so if you're working in a React app you need to turn that on yourself.
