#!/usr/bin/env bash

set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"

# webpack is dependent on cwd.
cd ..

yarn run selenium

COVERAGE=1 webpack \
  --config packages/tdd-buffet/src/config/webpack.config.js \
  ./tests/coverage/webpack.ts -o ./tests/coverage/webpack-bundle.js

# --silent so we don't get the npm err epilogue.
yarn run _test --silent
