#!/usr/bin/env node

'use strict';

const meow = require('meow');
const execa = require('execa');
const path = require('path');

// TODO: add flags for hostname, port, wait
const cli = meow(`
  Usage
    $ start <nodes>
    $ debug
    $ stop
`);

(async () => {
  const cmd = execa(path.join(__dirname, `./scripts/${cli.input[0]}.sh`), cli.input.slice(1), {
    stdio: 'inherit'
  });

  await cmd;
})();
