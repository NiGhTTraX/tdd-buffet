#!/usr/bin/env node
/* istanbul ignore file */
/* eslint-disable no-console */
import meow from 'meow';
import { run } from '../jest';

const cli = meow(`
  Usage
    $ test       Run the tests.
`);

(async () => {
  switch (cli.input[0]) {
    case 'test':
      // [0] is the node executable
      // [1] is this script
      // [2] is the `test` command
      await run(process.argv.slice(3));
      break;
    default:
      throw new Error('Unknown command');
  }
})();
