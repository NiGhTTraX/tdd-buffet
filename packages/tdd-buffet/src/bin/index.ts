#!/usr/bin/env node
/* istanbul ignore file */
/* eslint-disable no-console */
import meow from 'meow';
import path from 'path';
import { run } from '../jest';
import { lint } from '../eslint';

const cli = meow(`
  Usage
    $ test       Run the tests.
    $ lint [files]     Lint the project.
    
  Options
    --config path  Path to Jest config.
    --coverage     Whether to generate coverage reports.
    --maxWorkers   Number of workers to spawn.
    --runInBand    Run tests serially without spawning workers.
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
    },
    maxWorkers: {
      type: 'string',
      default: '50%'
    },
    runInBand: {
      type: 'boolean',
      default: false
    }
  }
});

(async () => {
  switch (cli.input[0]) {
    case 'test':
      await run(cli.flags.config, {
        coverage: cli.flags.coverage,
        maxWorkers: cli.flags.maxWorkers,
        runInBand: cli.flags.runInBand
      });
      break;
    case 'lint':
      await lint(cli.input.slice(1));
      break;
    default:
      throw new Error('Unknown command');
  }
})();
