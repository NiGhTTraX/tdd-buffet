#!/usr/bin/env node
/* eslint-disable no-await-in-loop,no-console */

'use strict';

const meow = require('meow');
const got = require('got');
const ProgressBar = require('progress');

const cli = meow(`
  Usage
    $ wait-for-nodes <nodes>
    
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

const TIMEOUT = 1000;

async function getCurrentlyConnectedNodes(hostname, port) {
  const url = `http://${hostname}:${port}/grid/api/hub`;

  const response = await got(url);

  return JSON.parse(response.body).slotCounts.free;
}

let pings = 0;

const expectedNodes = parseInt(cli.input[0], 10);
const { retries, host, port } = cli.flags;

console.log(`Waiting for ${expectedNodes} nodes to connect`);

const bar = new ProgressBar(':bar Nodes: :actual/:expected Retries: :pings/:retries', {
  total: retries,
  width: 60,
  clear: true
});

// Show the initial empty bar.
bar.tick(0, {
  actual: 0,
  expected: expectedNodes,
  pings: 0,
  retries
});

(async () => {
  while (pings++ <= retries) {
    let actualNodes = 0;

    try {
      actualNodes = await getCurrentlyConnectedNodes(host, port);
    } catch (e) {
      bar.interrupt(e.message);
    }

    bar.tick(1, {
      actual: actualNodes,
      expected: expectedNodes,
      pings: pings - 1,
      retries
    });

    if (actualNodes < expectedNodes) {
      await new Promise(resolve => setTimeout(resolve, TIMEOUT));
    } else {
      bar.terminate();
      console.log('Hub is ready');
      process.exit(0);
    }
  }

  bar.terminate();

  // if (lastError) {
  //   console.error(lastError);
  // }

  console.log('Hub was not ready in time');
  process.exit(1);
})();
