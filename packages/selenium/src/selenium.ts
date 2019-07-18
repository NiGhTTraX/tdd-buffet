/* istanbul ignore file */
/* eslint-disable no-console, no-await-in-loop */
import got from 'got';
import execa from 'execa';
import ProgressBar from 'progress';
import path from 'path';

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
    env: {
      COMPOSE_PROJECT_NAME: composeProjectName
    },
    stdio: 'inherit'
  });
}

export async function createVolume(name: string, hostPath: string) {
  await removeVolume(name);

  await execa.command(`docker volume create --driver local \
      --opt type=none \
      --opt device=${path.resolve(process.cwd(), hostPath)} \
      --opt o=bind \
      ${name}`, { stdio: 'inherit' });
}

export async function removeVolume(name: string) {
  await execa.command(`docker volume rm -f ${name}`, { stdio: 'inherit' });
}

export async function start(nodes: number, retries: number, port: number) {
  const configPath = path.join(__dirname, 'config/docker-compose.yml');

  await execa.command(
    `docker-compose -f ${configPath} up -d --scale chrome=${nodes} --scale firefox=${nodes} selenium`,
    {
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
    const configPath = path.join(__dirname, 'config/docker-compose.debug.yml');

    await execa.command(`docker-compose -f ${configPath} up -d selenium`, {
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
    await down(path.join(__dirname, 'config/docker-compose.yml'), 'tdd-buffet');
  } else {
    await down(path.join(__dirname, 'config/docker-compose.debug.yml'), 'tdd-buffet:debug');
  }
}
