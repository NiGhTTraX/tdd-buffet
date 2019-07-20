#!/usr/bin/env node
/* istanbul ignore file */
/* eslint-disable no-console */
import meow from 'meow';
import path from 'path';
import { debug, start, stop } from '../selenium';


const cli = meow(`
  Usage
    $ start [N]  Start the grid and connect 2*N nodes.
    $ debug      Start the grid and connect 2 nodes with VNC.
    $ stop       Stop the grid and any connected nodes.
    
  Options
    --port [4444]    The port where the Selenium hub is listening.
    --retries [15]   Number of times to retry waiting for all nodes to connect.
                     There's a 1 second wait between retries.
    --html path      Path to a folder that will be mounted inside the browser 
                     nodes at /var/www/html. Will be resolved relative to cwd.
`, {
  // @ts-ignore
  flags: {
    port: {
      type: 'number',
      default: 4444
    },
    retries: {
      type: 'number',
      default: 15
    },
    html: {
      type: 'string',
      default: path.join(__dirname, '../config/html')
    }
  }
});

(async () => {
  const htmlPath = path.resolve(process.cwd(), cli.flags.html);

  switch (cli.input[0]) {
    case 'start':
      await stop();

      await start(
        parseInt(cli.input[1] || '1', 10),
        parseInt(cli.flags.retries, 10),
        parseInt(cli.flags.port, 10),
        htmlPath
      );
      break;
    case 'stop':
      await stop();
      break;
    case 'debug':
      await debug(
        parseInt(cli.flags.retries, 10),
        parseInt(cli.flags.port, 10),
        htmlPath
      );
      break;
    default:
      console.error(cli.help);
      process.exit(1);
  }
})();
