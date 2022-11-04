# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.3.8](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.3.7...@tdd-buffet/visual@0.3.8) (2022-11-04)

### Bug Fixes

- **deps:** update dependency puppeteer to ~19.1.0 ([1dfcfe4](https://github.com/NiGhTTraX/tdd-buffet/commit/1dfcfe429cdf9d2890c4e6caa624d3f530fda073))
- **deps:** update dependency puppeteer to ~19.2.0 ([df61648](https://github.com/NiGhTTraX/tdd-buffet/commit/df616486c3557bf3f98f84bb0e3199c103cd97ca))
- **deps:** update dependency puppeteer to v19 ([4c26eae](https://github.com/NiGhTTraX/tdd-buffet/commit/4c26eae7eee8f439e8f4f6c0c3bb14a68fa29c6a))

## [0.3.7](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.3.6...@tdd-buffet/visual@0.3.7) (2022-07-17)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.3.6](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.3.5...@tdd-buffet/visual@0.3.6) (2022-07-17)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.3.5](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.3.4...@tdd-buffet/visual@0.3.5) (2021-10-27)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.3.4](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.3.3...@tdd-buffet/visual@0.3.4) (2021-07-05)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.3.3](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.3.2...@tdd-buffet/visual@0.3.3) (2021-06-13)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.3.2](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.3.1...@tdd-buffet/visual@0.3.2) (2021-05-31)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.3.1](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.3.0...@tdd-buffet/visual@0.3.1) (2021-05-29)

**Note:** Version bump only for package @tdd-buffet/visual

# [0.3.0](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.2.49...@tdd-buffet/visual@0.3.0) (2021-04-25)

### Bug Fixes

- **deps:** update dependency @mugshot/webdriverio to ~2.0.0 ([4b82abf](https://github.com/NiGhTTraX/tdd-buffet/commit/4b82abf3ba0f431814b14ab4a79199bcafcc54cd))

### Code Refactoring

- Use Puppeteer instead of WebdriverIO ([6960e4c](https://github.com/NiGhTTraX/tdd-buffet/commit/6960e4c75bf30e49ca5be8754fb4abdd24696abe))

### BREAKING CHANGES

- `tdd-buffet/suite/gui` and `@tdd-buffet/visual` now use
  Puppeteer instead of WebdriverIO for faster tests with less setup.

Changes include:

- a Puppeteer.Page is passed to `vit` instead of `WebdriverIO.Browser`
- `bindBrowser` has been renamed to `bindPage` to align with Puppeteer types
- the `BROWSER`, `SELENIUM_HOST` and `SELENIUM_PORT` environment variable have
  been removed
- test names will no longer contain the browser name
- the screenshot results path will no longer contain the browser name

## [0.2.49](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.2.48...@tdd-buffet/visual@0.2.49) (2021-04-06)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.2.48](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.2.47...@tdd-buffet/visual@0.2.48) (2021-03-09)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.2.47](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.2.46...@tdd-buffet/visual@0.2.47) (2021-02-21)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.2.46](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.2.45...@tdd-buffet/visual@0.2.46) (2021-02-14)

### Bug Fixes

- **deps:** update dependency mugshot to ~3.3.0 ([3b6a9a4](https://github.com/NiGhTTraX/tdd-buffet/commit/3b6a9a4))

## [0.2.45](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.2.44...@tdd-buffet/visual@0.2.45) (2020-12-14)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.2.44](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.2.43...@tdd-buffet/visual@0.2.44) (2020-10-18)

### Bug Fixes

- **deps:** update dependency mugshot to ~3.1.0 ([3bc65aa](https://github.com/NiGhTTraX/tdd-buffet/commit/3bc65aa))
- **deps:** update dependency mugshot to ~3.2.0 ([2632dbc](https://github.com/NiGhTTraX/tdd-buffet/commit/2632dbc))

## [0.2.43](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.2.42...@tdd-buffet/visual@0.2.43) (2020-09-02)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.2.42](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.2.41...@tdd-buffet/visual@0.2.42) (2020-06-13)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.2.41](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.2.40...@tdd-buffet/visual@0.2.41) (2020-05-22)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.2.40](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.2.39...@tdd-buffet/visual@0.2.40) (2020-05-22)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.2.39](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.2.39-alpha.0...@tdd-buffet/visual@0.2.39) (2020-05-22)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.2.39-alpha.0](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.2.38...@tdd-buffet/visual@0.2.39-alpha.0) (2020-04-07)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.2.38](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.2.37...@tdd-buffet/visual@0.2.38) (2020-03-22)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.2.37](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.2.36...@tdd-buffet/visual@0.2.37) (2020-03-22)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.2.36](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.2.35...@tdd-buffet/visual@0.2.36) (2020-03-22)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.2.35](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.2.34...@tdd-buffet/visual@0.2.35) (2020-03-22)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.2.34](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.2.33...@tdd-buffet/visual@0.2.34) (2020-03-20)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.2.33](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.2.32...@tdd-buffet/visual@0.2.33) (2019-12-20)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.2.32](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.2.31...@tdd-buffet/visual@0.2.32) (2019-12-20)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.2.31](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.2.30...@tdd-buffet/visual@0.2.31) (2019-11-24)

**Note:** Version bump only for package @tdd-buffet/visual

## [0.2.30](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/visual@0.2.29...@tdd-buffet/visual@0.2.30) (2019-11-23)

**Note:** Version bump only for package @tdd-buffet/visual
