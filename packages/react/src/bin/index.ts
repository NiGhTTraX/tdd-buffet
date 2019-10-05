#!/usr/bin/env node

/* istanbul ignore file */
import meow from 'meow';
import path from 'path';
import { startServer } from './start';

const cli = meow(`
  Usage
    $ start       Start the development server.
`, {
  flags: {
    config: {
      type: 'string',
      default: path.join(__dirname, '../config/webpack.config.js')
    }
  }
});

(async() => {
  switch (cli.input[0]) {
    case 'start':
      // eslint-disable-next-line no-case-declarations
      const configFactory = await import(path.resolve(process.cwd(), cli.flags.config));
      return startServer(configFactory.default);
    default:
      throw new Error('Unknown command');
  }
})();
