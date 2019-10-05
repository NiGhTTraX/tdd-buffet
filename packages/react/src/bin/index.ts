#!/usr/bin/env node

/* istanbul ignore file */
import meow from 'meow';
import path from 'path';
import { Configuration } from 'webpack';
import { buildProd } from './build';
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

type ConfigFactory = { default: (webpackEnv: 'development' | 'production') => Configuration };

(async() => {
  const { default: configFactory }: ConfigFactory = await import(
    path.resolve(process.cwd(), cli.flags.config)
  );

  switch (cli.input[0]) {
    case 'start':
      return startServer(configFactory('development'));
    case 'build':
      return buildProd(configFactory('production'));
    default:
      throw new Error('Unknown command');
  }
})();
