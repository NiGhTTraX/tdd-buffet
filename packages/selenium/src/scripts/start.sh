#!/usr/bin/env bash

set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"

# Clean up first.
./stop.js

NR_NODES=${1:-1}

COMPOSE_PROJECT_NAME=tdd-buffet docker-compose up -d \
 --scale chrome="${NR_NODES}" --scale firefox="${NR_NODES}" selenium

./wait-for-nodes.js $((NR_NODES * 2))
