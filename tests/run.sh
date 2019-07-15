#!/usr/bin/env bash

set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"

npm run selenium

# --silent so we don't get the npm err epilogue.
npm run _test --silent
