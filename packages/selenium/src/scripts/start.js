#!/usr/bin/env node
/* eslint-disable no-console */

'use strict';

const execa = require('execa');
const meow = require('meow');
const { waitForNodes } = require('../selenium');

const cli = meow(`
  Usage
    $ start <nodes>
    
  Options
    --host [0.0.0.0] The host where the Selenium hub is listening.
    --port [4444]    The port where the Selenium hub is listening.
    --retries [15]   Number of times to retry waiting for all nodes to connect.
                     There's a 1 second wait between retries.
`, {
  flags: {
    host: {
      type: 'string',
      default: '0.0.0.0'
    },
    port: {
      type: 'number',
      default: 4444
    },
    retries: {
      type: 'number',
      default: 15
    }
  }
});

const nodes = parseInt(cli.input[0] || '1', 10);
const { retries, host, port } = cli.flags;

(async () => {
  await execa('./stop.js', {
    cwd: __dirname,
    stdio: 'inherit'
  });

  await execa.command(`docker-compose up -d --scale chrome=${nodes} --scale firefox=${nodes} selenium`, {
    cwd: __dirname,
    env: {
      COMPOSE_PROJECT_NAME: 'tdd-buffet'
    },
    stdio: 'inherit'
  });

  console.log(`Waiting for ${nodes * 2} nodes to connect`);
  await waitForNodes(nodes * 2, retries, host, port);
  console.log('Hub is ready');
})();
