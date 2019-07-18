'use strict';

/* eslint-disable no-console, no-await-in-loop */
const got = require('got');
const ProgressBar = require('progress');

const TIMEOUT = 1000;
const waitTimeout = resolve => setTimeout(resolve, TIMEOUT);

async function getCurrentlyConnectedNodes(hostname, port) {
  const url = `http://${hostname}:${port}/grid/api/hub`;

  const response = await got(url);

  return JSON.parse(response.body).slotCounts.free;
}

module.exports.waitForNodes = async function waitForNodes(expectedNodes, retries, host, port) {
  let pings = 0;

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
      await new Promise(waitTimeout);
    } else {
      bar.terminate();
      return;
    }
  }

  bar.terminate();

  throw new Error('Hub was not ready in time');
};
