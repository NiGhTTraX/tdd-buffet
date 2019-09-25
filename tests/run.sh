#!/usr/bin/env bash

set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"
cd ..

yarn run selenium

# TODO: use lerna run test to not leak test fixtures
yarn --cwd packages/react run webpack

# --silent so we don't get the npm err epilogue.
yarn run _test --silent
