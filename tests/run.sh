#!/usr/bin/env bash

set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"

yarn run selenium

# --silent so we don't get the npm err epilogue.
yarn run _test --silent -- --runInBand
