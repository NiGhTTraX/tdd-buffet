#!/usr/bin/env node

'use strict';

const execa = require('execa');

async function down(config, composeProjectName) {
  await execa.command(`docker-compose -f ${config} down`, {
    env: {
      COMPOSE_PROJECT_NAME: composeProjectName
    },
    stdio: 'inherit'
  });
}

(async () => {
  await down('./docker-compose.yml', 'tdd-buffet');
  await down('./docker-compose.debug.yml', 'tdd-buffet:debug');
})();
