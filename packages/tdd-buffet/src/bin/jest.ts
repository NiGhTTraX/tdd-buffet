#!/usr/bin/env node
/**
 * This file is meant to be used by WebStorm when searching for the Jest binary.
 */
import { run } from '../jest';

(async () => {
  await run(process.argv.slice(2));
})();
