# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.0.0](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/jest-config@2.0.3...@tdd-buffet/jest-config@3.0.0) (2021-02-14)


### Bug Fixes

* **deps:** update dependency fs-extra to ~9.1.0 ([0fb02fd](https://github.com/NiGhTTraX/tdd-buffet/commit/0fb02fd))
* **deps:** update dependency ts-jest to ~26.5.0 ([d2440b0](https://github.com/NiGhTTraX/tdd-buffet/commit/d2440b0))


### Code Refactoring

* **jest:** Use lcov reports instead of json+html ([0479af6](https://github.com/NiGhTTraX/tdd-buffet/commit/0479af6))


### BREAKING CHANGES

* **jest:** this might break your coverage uploading if you were
targetting `coverage-final.json` explictly. If you're using `codecov`
you should be able to remove the `-f` param and let it discover the
`lcov.info` files automatically.





## [2.0.3](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/jest-config@2.0.2...@tdd-buffet/jest-config@2.0.3) (2020-12-14)


### Bug Fixes

* **deps:** update dependency whatwg-fetch to ~3.5.0 ([0c98d2d](https://github.com/NiGhTTraX/tdd-buffet/commit/0c98d2d))
* **deps:** update jest monorepo to ~26.6.0 ([b4db1a6](https://github.com/NiGhTTraX/tdd-buffet/commit/b4db1a6))





## [2.0.2](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/jest-config@2.0.1...@tdd-buffet/jest-config@2.0.2) (2020-10-18)


### Bug Fixes

* **deps:** update dependency ts-jest to ~26.4.0 ([c3a3efa](https://github.com/NiGhTTraX/tdd-buffet/commit/c3a3efa))





## [2.0.1](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/jest-config@2.0.0...@tdd-buffet/jest-config@2.0.1) (2020-09-02)


### Bug Fixes

* **deps:** update dependency ts-jest to ~26.2.0 ([af4057c](https://github.com/NiGhTTraX/tdd-buffet/commit/af4057c))
* **deps:** update dependency ts-jest to ~26.3.0 ([993a7a9](https://github.com/NiGhTTraX/tdd-buffet/commit/993a7a9))
* **deps:** update dependency whatwg-fetch to ~3.1.0 ([ec55908](https://github.com/NiGhTTraX/tdd-buffet/commit/ec55908))
* **deps:** update dependency whatwg-fetch to ~3.2.0 ([63adb89](https://github.com/NiGhTTraX/tdd-buffet/commit/63adb89))
* **deps:** update dependency whatwg-fetch to ~3.3.0 ([bf91f76](https://github.com/NiGhTTraX/tdd-buffet/commit/bf91f76))
* **deps:** update dependency whatwg-fetch to ~3.4.0 ([c61187f](https://github.com/NiGhTTraX/tdd-buffet/commit/c61187f))
* **deps:** update jest monorepo to ~26.1.0 ([978b7b6](https://github.com/NiGhTTraX/tdd-buffet/commit/978b7b6))
* **deps:** update jest monorepo to ~26.2.0 ([4900552](https://github.com/NiGhTTraX/tdd-buffet/commit/4900552))
* **deps:** update jest monorepo to ~26.3.0 ([4a9a376](https://github.com/NiGhTTraX/tdd-buffet/commit/4a9a376))
* **deps:** update jest monorepo to ~26.4.0 ([d3f0c40](https://github.com/NiGhTTraX/tdd-buffet/commit/d3f0c40))





# [2.0.0](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/jest-config@1.0.3...@tdd-buffet/jest-config@2.0.0) (2020-06-13)


### Bug Fixes

* **deps:** update dependency ts-jest to ~26.1.0 ([c0abce6](https://github.com/NiGhTTraX/tdd-buffet/commit/c0abce6))
* **deps:** update jest monorepo to v26 ([65930fd](https://github.com/NiGhTTraX/tdd-buffet/commit/65930fd))


* refactor(jest-config)!: Remove support for adding external coverage data ([4a2d43d](https://github.com/NiGhTTraX/tdd-buffet/commit/4a2d43d))


### BREAKING CHANGES

* jest@26 changed their internals on which this feature was
dependent.





## [1.0.3](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/jest-config@1.0.2...@tdd-buffet/jest-config@1.0.3) (2020-05-22)

**Note:** Version bump only for package @tdd-buffet/jest-config





## [1.0.2](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/jest-config@1.0.1...@tdd-buffet/jest-config@1.0.2) (2020-05-22)


### Bug Fixes

* **jest-config:** Fix ts-jest not found error ([e4a6af3](https://github.com/NiGhTTraX/tdd-buffet/commit/e4a6af3))





## [1.0.1](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/jest-config@1.0.0...@tdd-buffet/jest-config@1.0.1) (2020-05-22)


### Bug Fixes

* **jest-config:** Fix ts-jest not found error ([e45fd11](https://github.com/NiGhTTraX/tdd-buffet/commit/e45fd11))





# [1.0.0](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/jest-config@1.0.0-alpha.4...@tdd-buffet/jest-config@1.0.0) (2020-05-22)


### Bug Fixes

* **deps:** update dependency @types/fs-extra to v9 ([384da42](https://github.com/NiGhTTraX/tdd-buffet/commit/384da42))
* **deps:** update dependency ts-jest to ~25.4.0 ([ec5dd8d](https://github.com/NiGhTTraX/tdd-buffet/commit/ec5dd8d))
* **deps:** update dependency ts-jest to ~25.5.0 ([cb6cbb1](https://github.com/NiGhTTraX/tdd-buffet/commit/cb6cbb1))
* **deps:** update dependency ts-jest to v26 ([088d701](https://github.com/NiGhTTraX/tdd-buffet/commit/088d701))
* **deps:** update jest monorepo to ~25.3.0 ([d4f2548](https://github.com/NiGhTTraX/tdd-buffet/commit/d4f2548))
* **deps:** update jest monorepo to ~25.4.0 ([ad10edd](https://github.com/NiGhTTraX/tdd-buffet/commit/ad10edd))
* **jest-config:** Make sure we choose our jest environment ([0341d0b](https://github.com/NiGhTTraX/tdd-buffet/commit/0341d0b))


### Features

* **jest-config:** Upgrade jsdom to v15 ([cdb9fa9](https://github.com/NiGhTTraX/tdd-buffet/commit/cdb9fa9))





# [1.0.0-alpha.4](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/jest-config@1.0.0-alpha.3...@tdd-buffet/jest-config@1.0.0-alpha.4) (2020-04-07)


### Features

* **jest-config:** Upgrade jsdom ([584a160](https://github.com/NiGhTTraX/tdd-buffet/commit/584a160))





# [1.0.0-alpha.3](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/jest-config@1.0.0-alpha.2...@tdd-buffet/jest-config@1.0.0-alpha.3) (2020-04-07)


### Features

* **jest-config:** Ignore coverage from stories ([7693bf0](https://github.com/NiGhTTraX/tdd-buffet/commit/7693bf0))





# [1.0.0-alpha.2](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/jest-config@1.0.0-alpha.1...@tdd-buffet/jest-config@1.0.0-alpha.2) (2020-04-07)

**Note:** Version bump only for package @tdd-buffet/jest-config





# [1.0.0-alpha.1](https://github.com/NiGhTTraX/tdd-buffet/compare/@tdd-buffet/jest-config@1.0.0-alpha.0...@tdd-buffet/jest-config@1.0.0-alpha.1) (2020-04-07)

**Note:** Version bump only for package @tdd-buffet/jest-config





# 1.0.0-alpha.0 (2020-04-07)


### Bug Fixes

* **deps:** update dependency ts-jest to ~25.3.0 ([4d58556](https://github.com/NiGhTTraX/tdd-buffet/commit/4d58556))


### Code Refactoring

* **tdd-buffet:** Move jest config to separate package ([21be32d](https://github.com/NiGhTTraX/tdd-buffet/commit/21be32d))


### BREAKING CHANGES

* **tdd-buffet:** `require('tdd-buffet/config/jest.config.js')` is now
replaced by `require('@tdd-buffet/jest-config')`
