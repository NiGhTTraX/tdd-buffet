/* istanbul ignore file */
import { execaCommand } from 'execa';
/* eslint-disable no-console, no-await-in-loop */
import got from 'got';
import path from 'path';
import ProgressBar from 'progress';

const TIMEOUT = 1000;
const COMPOSE_PROJECT_NAME = 'tdd-buffet';
const waitTimeout = (resolve: (...args: any[]) => void) =>
  setTimeout(resolve, TIMEOUT);

async function getCurrentlyConnectedNodes(port: number) {
  const url = `http://0.0.0.0:${port}/grid/api/hub`;

  const response = await got(url);

  return JSON.parse(response.body).slotCounts.free;
}

async function waitForNodes(
  expectedNodes: number,
  retries: number,
  port: number
) {
  let pings = 0;

  const bar = new ProgressBar(
    ':bar Nodes: :actual/:expected Attempts: :pings/:retries',
    {
      total: retries,
      width: 60,
      clear: true,
    }
  );

  // Show the initial empty bar.
  bar.tick(0, {
    actual: 0,
    expected: expectedNodes,
    pings: 0,
    retries,
  });

  while (pings++ < retries) {
    let actualNodes = 0;

    try {
      actualNodes = await getCurrentlyConnectedNodes(port);
    } catch (e) {
      // Ignore errors.
    }

    bar.tick(1, {
      actual: actualNodes,
      expected: expectedNodes,
      pings: pings - 1,
      retries,
    });

    if (actualNodes < expectedNodes) {
      if (pings < retries) {
        await new Promise(waitTimeout);
      }
    } else {
      bar.terminate();

      return;
    }
  }

  bar.terminate();

  throw new Error('Hub was not ready in time');
}

async function up(
  configPath: string,
  services: string,
  port: number,
  expectedNodes: number,
  retries: number
) {
  try {
    await execaCommand(`docker-compose -f ${configPath} up -d ${services}`, {
      env: {
        HUB_PORT: `${port}`,
        COMPOSE_PROJECT_NAME,
      },
      stdio: 'inherit',
    });

    console.log(`Waiting for ${expectedNodes} nodes to connect`);
    await waitForNodes(expectedNodes, retries, port);
    console.log('Hub is ready');
  } catch (e) {
    await stop();

    throw e;
  }
}

export async function start(nodes: number, retries: number, port: number) {
  await up(
    path.join(__dirname, 'config/docker-compose.yml'),
    `--scale chrome=${nodes} --scale firefox=${nodes} hub`,
    port,
    nodes * 2,
    retries
  );
}

export async function debug(retries: number, port: number) {
  try {
    console.log('Checking to see if hub is already ready');
    await waitForNodes(2, 1, port);

    console.log('Hub was already ready');
    process.exit(0);
  } catch (e) {
    await up(
      path.join(__dirname, 'config/docker-compose.yml'),
      'debug_hub',
      port,
      2,
      retries
    );
  }
}

export async function stop() {
  await execaCommand(
    `docker-compose -f ${path.join(
      __dirname,
      'config/docker-compose.yml'
    )} down -v`,
    {
      env: {
        COMPOSE_PROJECT_NAME,
      },
      stdio: 'inherit',
    }
  );
}
