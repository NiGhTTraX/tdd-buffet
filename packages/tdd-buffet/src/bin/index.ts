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
      await run(process.argv.slice(2));
      break;
    default:
      throw new Error('Unknown command');
  }
})();
