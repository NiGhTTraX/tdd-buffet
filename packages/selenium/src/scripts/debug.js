#!/usr/bin/env node
/* eslint-disable no-console */

'use strict';

const meow = require('meow');
const execa = require('execa');
const { waitForNodes } = require('../selenium');

const cli = meow(`
  Usage
    $ debug
    
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

const { retries, host, port } = cli.flags;

(async () => {
  try {
    console.log('Checking to see if hub is already ready');
    await waitForNodes(2, 1, host, port);

    console.log('Hub was already ready');
    process.exit(0);
  } catch (e) {
    await execa.command('docker-compose -f docker-compose.debug.yml up -d selenium', {
      env: {
        COMPOSE_PROJECT_NAME: 'tdd-buffet:debug'
      },
      stdio: 'inherit'
    });

    console.log('Waiting for 2 debug nodes to connect');
    await waitForNodes(2, retries, host, port);
    console.log('Hub is ready');
  }
})();
