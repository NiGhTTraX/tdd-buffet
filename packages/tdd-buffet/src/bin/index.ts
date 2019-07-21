#!/usr/bin/env node
/* istanbul ignore file */
/* eslint-disable no-console */
import meow from 'meow';
import path from 'path';
import { run } from '../jest-runner';

const cli = meow(`
  Usage
    $ test       Run the tests.
    
  Options
    --config path  Path to Jest config.
    --coverage     Whether to generate coverage reports.
`, {
  // @ts-ignore
  flags: {
    config: {
      type: 'string',
      default: path.join(__dirname, '../config/jest.config.js')
    },
    coverage: {
      type: 'boolean',
      default: false
    }
  }
});

(async () => {
  switch (cli.input[0]) {
    case 'test':
      await run(cli.flags.config, cli.flags.coverage);
      break;
    default:
      throw new Error('Unknown command');
  }
})();
