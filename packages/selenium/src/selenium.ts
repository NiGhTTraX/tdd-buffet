/* eslint-disable no-console, no-await-in-loop */
import got from 'got';
import execa from 'execa';
import ProgressBar from 'progress';

const TIMEOUT = 1000;
const waitTimeout = (resolve: (...args: any[]) => void) => setTimeout(resolve, TIMEOUT);

async function getCurrentlyConnectedNodes(port: number) {
  const url = `http://0.0.0.0:${port}/grid/api/hub`;

  const response = await got(url);

  return JSON.parse(response.body).slotCounts.free;
}

async function waitForNodes(expectedNodes: number, retries: number, port: number) {
  let pings = 0;

  const bar = new ProgressBar(':bar Nodes: :actual/:expected Attempts: :pings/:retries', {
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

  while (pings++ < retries) {
    let actualNodes = 0;

    try {
      actualNodes = await getCurrentlyConnectedNodes(port);
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

async function down(config: string, composeProjectName: string) {
  await execa.command(`docker-compose -f ${config} down`, {
    cwd: __dirname,
    env: {
      COMPOSE_PROJECT_NAME: composeProjectName
    },
    stdio: 'inherit'
  });
}

export async function start(nodes: number, retries: number, port: number) {
  await execa.command(
    `docker-compose -f ./docker-compose.yml up -d --scale chrome=${nodes} --scale firefox=${nodes} selenium`,
    {
      cwd: __dirname,
      env: {
        HUB_PORT: `${port}`,
        COMPOSE_PROJECT_NAME: 'tdd-buffet'
      },
      stdio: 'inherit'
    }
  );

  console.log(`Waiting for ${nodes * 2} nodes to connect`);
  await waitForNodes(nodes * 2, retries, port);
  console.log('Hub is ready');
}

export async function debug(retries: number, port: number) {
  try {
    console.log('Checking to see if hub is already ready');
    await waitForNodes(2, 1, port);

    console.log('Hub was already ready');
    process.exit(0);
  } catch (e) {
    await execa.command('docker-compose -f ./docker-compose.debug.yml up -d selenium', {
      cwd: __dirname,
      env: {
        HUB_PORT: `${port}`,
        COMPOSE_PROJECT_NAME: 'tdd-buffet:debug'
      },
      stdio: 'inherit'
    });

    console.log('Waiting for 2 debug nodes to connect');
    await waitForNodes(2, retries, port);
    console.log('Hub is ready');
  }
}

export async function stop(theDebug?: 'debug') {
  if (!theDebug) {
    await down('./docker-compose.yml', 'tdd-buffet');
  } else {
    await down('./docker-compose.debug.yml', 'tdd-buffet:debug');
  }
}
