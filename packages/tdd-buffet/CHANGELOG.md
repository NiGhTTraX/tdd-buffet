# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.4](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@3.0.3...tdd-buffet@3.0.4) (2021-07-05)


### Bug Fixes

* **deps:** update dependency puppeteer to ~10.1.0 ([f7da4f1](https://github.com/NiGhTTraX/tdd-buffet/commit/f7da4f1c8fce9f971d4fa39263df63240c58d853))





## [3.0.3](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@3.0.2...tdd-buffet@3.0.3) (2021-06-13)


### Bug Fixes

* **deps:** update dependency execa to ~5.1.0 ([3404da7](https://github.com/NiGhTTraX/tdd-buffet/commit/3404da7b8ea453261ab179901a637ba52fd69775))
* **deps:** update dependency puppeteer to v10 ([fb1fb05](https://github.com/NiGhTTraX/tdd-buffet/commit/fb1fb058d24c589738ce83f6b0d2be8c71ec059a))





## [3.0.2](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@3.0.1...tdd-buffet@3.0.2) (2021-05-31)

**Note:** Version bump only for package tdd-buffet





## [3.0.1](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@3.0.0...tdd-buffet@3.0.1) (2021-05-29)


### Bug Fixes

* **deps:** update dependency fs-extra to v10 ([802ed0e](https://github.com/NiGhTTraX/tdd-buffet/commit/802ed0e221d208a1d69bc707cc8496fb2671ae0f))
* **deps:** update dependency puppeteer to ~9.1.0 ([3b54ad6](https://github.com/NiGhTTraX/tdd-buffet/commit/3b54ad6cc0bfeca091a961db80e5e8122afc3025))
* **deps:** update dependency ts-loader to ~9.2.0 ([4afe423](https://github.com/NiGhTTraX/tdd-buffet/commit/4afe423a29d02eadb47221ab1a05bda8f0e6e39b))
* **deps:** update jest monorepo to v27 ([c983217](https://github.com/NiGhTTraX/tdd-buffet/commit/c9832178f66578890f6b6ac453b92fd9bd3ce14d))





# [3.0.0](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@2.1.6...tdd-buffet@3.0.0) (2021-04-25)


### Bug Fixes

* **deps:** update dependency ts-loader to ~9.1.0 ([b90a952](https://github.com/NiGhTTraX/tdd-buffet/commit/b90a952b2f233e0800aab625cd4bdb33f49bd3c1))
* **deps:** update dependency ts-loader to v9 ([c5442ab](https://github.com/NiGhTTraX/tdd-buffet/commit/c5442abf9b7b91cf6a080e8bc242694c7ec2fa24))


### Code Refactoring

* Use Puppeteer instead of WebdriverIO ([6960e4c](https://github.com/NiGhTTraX/tdd-buffet/commit/6960e4c75bf30e49ca5be8754fb4abdd24696abe))


### Features

* **tdd-buffet:** Allow specifying Puppeteer launch options ([6366fea](https://github.com/NiGhTTraX/tdd-buffet/commit/6366fea9a19332de0df696d4bb839f64daa8c582))


### BREAKING CHANGES

* `tdd-buffet/suite/gui` and `@tdd-buffet/visual` now use
Puppeteer instead of WebdriverIO for faster tests with less setup.

Changes include:

- a Puppeteer.Page is passed to `vit` instead of `WebdriverIO.Browser`
- `bindBrowser` has been renamed to `bindPage` to align with Puppeteer types
- the `BROWSER`, `SELENIUM_HOST` and `SELENIUM_PORT` environment variable have
been removed
- test names will no longer contain the browser name
- the screenshot results path will no longer contain the browser name





## [2.1.6](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@2.1.5...tdd-buffet@2.1.6) (2021-04-06)


### Bug Fixes

* **deps:** update dependency ts-loader to ~8.1.0 ([2984598](https://github.com/NiGhTTraX/tdd-buffet/commit/29845987e357f4344cef959040e06e2fafe58f14))





## [2.1.5](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@2.1.4...tdd-buffet@2.1.5) (2021-03-09)

**Note:** Version bump only for package tdd-buffet





## [2.1.4](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@2.1.3...tdd-buffet@2.1.4) (2021-02-21)

**Note:** Version bump only for package tdd-buffet





## [2.1.3](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@2.1.2...tdd-buffet@2.1.3) (2021-02-14)


### Bug Fixes

* **deps:** update dependency chai to ~4.3.0 ([67c274e](https://github.com/NiGhTTraX/tdd-buffet/commit/67c274e))
* **deps:** update dependency fs-extra to ~9.1.0 ([0fb02fd](https://github.com/NiGhTTraX/tdd-buffet/commit/0fb02fd))
* **deps:** update dependency meow to ~8.1.0 ([945646a](https://github.com/NiGhTTraX/tdd-buffet/commit/945646a))
* **deps:** update dependency meow to v9 ([5446872](https://github.com/NiGhTTraX/tdd-buffet/commit/5446872))
* **deps:** update dependency webdriverio to ~6.11.0 ([f23e2c2](https://github.com/NiGhTTraX/tdd-buffet/commit/f23e2c2))
* **deps:** update dependency webdriverio to ~6.12.0 ([2604482](https://github.com/NiGhTTraX/tdd-buffet/commit/2604482))





## [2.1.2](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@2.1.1...tdd-buffet@2.1.2) (2020-12-14)


### Bug Fixes

* **deps:** update dependency execa to ~4.1.0 ([cb8ff44](https://github.com/NiGhTTraX/tdd-buffet/commit/cb8ff44))
* **deps:** update dependency execa to v5 ([77c7d06](https://github.com/NiGhTTraX/tdd-buffet/commit/77c7d06))
* **deps:** update dependency meow to v8 ([c2af368](https://github.com/NiGhTTraX/tdd-buffet/commit/c2af368))
* **deps:** update dependency webdriverio to ~6.10.0 ([5e00ab1](https://github.com/NiGhTTraX/tdd-buffet/commit/5e00ab1))
* **deps:** update dependency webdriverio to ~6.7.0 ([c272074](https://github.com/NiGhTTraX/tdd-buffet/commit/c272074))
* **deps:** update dependency webdriverio to ~6.8.0 ([b338f5a](https://github.com/NiGhTTraX/tdd-buffet/commit/b338f5a))
* **deps:** update dependency webdriverio to ~6.9.0 ([63a2bf8](https://github.com/NiGhTTraX/tdd-buffet/commit/63a2bf8))
* **deps:** update jest monorepo to ~26.6.0 ([b4db1a6](https://github.com/NiGhTTraX/tdd-buffet/commit/b4db1a6))





## [2.1.1](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@2.1.0...tdd-buffet@2.1.1) (2020-10-18)


### Bug Fixes

* **deps:** update dependency webdriverio to ~6.5.0 ([f03949c](https://github.com/NiGhTTraX/tdd-buffet/commit/f03949c))
* **deps:** update dependency webdriverio to ~6.6.0 ([7962ec9](https://github.com/NiGhTTraX/tdd-buffet/commit/7962ec9))





# [2.1.0](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@2.0.0...tdd-buffet@2.1.0) (2020-09-02)


### Bug Fixes

* **deps:** update dependency meow to ~7.1.0 ([f6bf458](https://github.com/NiGhTTraX/tdd-buffet/commit/f6bf458))
* **deps:** update dependency ts-loader to v8 ([7fbccd8](https://github.com/NiGhTTraX/tdd-buffet/commit/7fbccd8))
* **deps:** update jest monorepo to ~26.1.0 ([978b7b6](https://github.com/NiGhTTraX/tdd-buffet/commit/978b7b6))
* **deps:** update jest monorepo to ~26.2.0 ([4900552](https://github.com/NiGhTTraX/tdd-buffet/commit/4900552))
* **deps:** update jest monorepo to ~26.3.0 ([4a9a376](https://github.com/NiGhTTraX/tdd-buffet/commit/4a9a376))
* **deps:** update jest monorepo to ~26.4.0 ([d3f0c40](https://github.com/NiGhTTraX/tdd-buffet/commit/d3f0c40))
* **tdd-buffet:** Add missing @types/jest dependency ([611bd7f](https://github.com/NiGhTTraX/tdd-buffet/commit/611bd7f))


### Features

* **tdd-buffet:** Upgrade to `webdriverio@6` ([62332ce](https://github.com/NiGhTTraX/tdd-buffet/commit/62332ce))





# [2.0.0](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@1.0.2...tdd-buffet@2.0.0) (2020-06-13)


### Bug Fixes

* **deps:** update jest monorepo to v26 ([65930fd](https://github.com/NiGhTTraX/tdd-buffet/commit/65930fd))
* **tdd-buffet:** Fix collecting external coverage ([a44d046](https://github.com/NiGhTTraX/tdd-buffet/commit/a44d046))


* refactor(tdd-buffet)!: Remove support for adding external coverage data ([e8311c5](https://github.com/NiGhTTraX/tdd-buffet/commit/e8311c5))


### BREAKING CHANGES

* jest@26 changed their internals on which this feature was
dependent.





## [1.0.2](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@1.0.1...tdd-buffet@1.0.2) (2020-05-22)

**Note:** Version bump only for package tdd-buffet





## [1.0.1](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@1.0.0...tdd-buffet@1.0.1) (2020-05-22)


### Bug Fixes

* **tdd-buffet:** Add missing @tdd-buffet/jest-config dependency ([b38fedf](https://github.com/NiGhTTraX/tdd-buffet/commit/b38fedf))





# [1.0.0](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@1.0.0-alpha.0...tdd-buffet@1.0.0) (2020-05-22)


### Bug Fixes

* **deps:** update dependency @types/fs-extra to v9 ([384da42](https://github.com/NiGhTTraX/tdd-buffet/commit/384da42))
* **deps:** update dependency meow to v7 ([da7ece6](https://github.com/NiGhTTraX/tdd-buffet/commit/da7ece6))
* **deps:** update dependency ts-loader to v7 ([2ed8c14](https://github.com/NiGhTTraX/tdd-buffet/commit/2ed8c14))
* **deps:** update jest monorepo to ~25.3.0 ([d4f2548](https://github.com/NiGhTTraX/tdd-buffet/commit/d4f2548))
* **deps:** update jest monorepo to ~25.4.0 ([ad10edd](https://github.com/NiGhTTraX/tdd-buffet/commit/ad10edd))





# [1.0.0-alpha.0](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@0.16.4...tdd-buffet@1.0.0-alpha.0) (2020-04-07)


### Bug Fixes

* **deps:** update dependency fs-extra to v9 ([4c471a7](https://github.com/NiGhTTraX/tdd-buffet/commit/4c471a7))
* **deps:** update dependency meow to ~6.1.0 ([7197237](https://github.com/NiGhTTraX/tdd-buffet/commit/7197237))
* **deps:** update dependency webdriverio to ~5.22.0 ([a4f346b](https://github.com/NiGhTTraX/tdd-buffet/commit/a4f346b))
* **deps:** update jest monorepo to ~25.2.0 ([8a06e4d](https://github.com/NiGhTTraX/tdd-buffet/commit/8a06e4d))


### Code Refactoring

* **tdd-buffet:** Move jest config to separate package ([21be32d](https://github.com/NiGhTTraX/tdd-buffet/commit/21be32d))
* **tdd-buffet:** Move tsconfig to separate package ([2e57f10](https://github.com/NiGhTTraX/tdd-buffet/commit/2e57f10))


### BREAKING CHANGES

* **tdd-buffet:** replace `extends: 'tdd-buffet/config/tsconfig.json'` with
`extends: '@tdd-buffet/tsconfig'`
* **tdd-buffet:** `require('tdd-buffet/config/jest.config.js')` is now
replaced by `require('@tdd-buffet/jest-config')`





## [0.16.4](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@0.16.3...tdd-buffet@0.16.4) (2020-03-22)

**Note:** Version bump only for package tdd-buffet





## [0.16.3](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@0.16.2...tdd-buffet@0.16.3) (2020-03-22)

**Note:** Version bump only for package tdd-buffet





## [0.16.2](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@0.16.1...tdd-buffet@0.16.2) (2020-03-22)

**Note:** Version bump only for package tdd-buffet





## [0.16.1](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@0.16.0...tdd-buffet@0.16.1) (2020-03-22)

**Note:** Version bump only for package tdd-buffet





# [0.16.0](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@0.15.4...tdd-buffet@0.16.0) (2020-03-20)


### Bug Fixes

* **deps:** update dependency @types/fs-extra to ~8.1.0 ([05e01b9](https://github.com/NiGhTTraX/tdd-buffet/commit/05e01b9))
* **deps:** update dependency @types/jest to ~24.9.0 ([fee6eb8](https://github.com/NiGhTTraX/tdd-buffet/commit/fee6eb8))
* **deps:** update dependency @types/jest to v25 ([8bc8934](https://github.com/NiGhTTraX/tdd-buffet/commit/8bc8934))
* **deps:** update dependency istanbul-lib-coverage to v3 ([d55c103](https://github.com/NiGhTTraX/tdd-buffet/commit/d55c103))
* **deps:** update dependency ts-jest to ~24.3.0 ([328e092](https://github.com/NiGhTTraX/tdd-buffet/commit/328e092))
* **deps:** update dependency ts-jest to ~25.2.0 ([f17d213](https://github.com/NiGhTTraX/tdd-buffet/commit/f17d213))
* **deps:** update dependency ts-jest to v25 ([934a7cf](https://github.com/NiGhTTraX/tdd-buffet/commit/934a7cf))
* **deps:** update dependency webdriverio to ~5.19.0 ([5b44698](https://github.com/NiGhTTraX/tdd-buffet/commit/5b44698))
* **deps:** update dependency webdriverio to ~5.20.0 ([9615582](https://github.com/NiGhTTraX/tdd-buffet/commit/9615582))
* **deps:** update dependency webdriverio to ~5.21.0 ([64bbc77](https://github.com/NiGhTTraX/tdd-buffet/commit/64bbc77))
* **deps:** update jest monorepo to v25 ([6af7c70](https://github.com/NiGhTTraX/tdd-buffet/commit/6af7c70))


### Features

* **tdd-buffet:** Load src/setupTests.ts before tests if it exists ([1fd982b](https://github.com/NiGhTTraX/tdd-buffet/commit/1fd982b))





## [0.15.4](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@0.15.3...tdd-buffet@0.15.4) (2019-12-20)


### Bug Fixes

* **deps:** update dependency execa to v4 ([f62934d](https://github.com/NiGhTTraX/tdd-buffet/commit/f62934d))
* **deps:** update dependency webdriverio to ~5.17.0 ([cbe32e9](https://github.com/NiGhTTraX/tdd-buffet/commit/cbe32e9))
* **deps:** update dependency webdriverio to ~5.18.0 ([c60262a](https://github.com/NiGhTTraX/tdd-buffet/commit/c60262a))





## [0.15.3](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@0.15.2...tdd-buffet@0.15.3) (2019-12-20)


### Bug Fixes

* **deps:** update dependency execa to ~3.4.0 ([84f1a11](https://github.com/NiGhTTraX/tdd-buffet/commit/84f1a11))
* **deps:** update dependency meow to v6 ([6ce3f32](https://github.com/NiGhTTraX/tdd-buffet/commit/6ce3f32))





## [0.15.2](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@0.15.1...tdd-buffet@0.15.2) (2019-11-24)


### Bug Fixes

* **tdd-buffet:** Don't register coverage for ignored files ([e273411](https://github.com/NiGhTTraX/tdd-buffet/commit/e273411))





## [0.15.1](https://github.com/NiGhTTraX/tdd-buffet/compare/tdd-buffet@0.15.0...tdd-buffet@0.15.1) (2019-11-23)

**Note:** Version bump only for package tdd-buffet
