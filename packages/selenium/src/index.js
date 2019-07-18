#!/usr/bin/env node

'use strict';

const meow = require('meow');
const execa = require('execa');

// TODO: add flags for hostname, port, wait
const cli = meow(`
  Usage
    $ start <nodes>
    $ debug
    $ stop
`);

(async () => {
  const cmd = execa(`./scripts/${cli.input[0]}.js`, cli.input.slice(1), {
    cwd: __dirname,
    stdio: 'inherit'
  });

  await cmd;
})();
