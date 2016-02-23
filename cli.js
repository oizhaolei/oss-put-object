#!/usr/bin/env node
'use strict';

const meow = require('meow');
const oss = require('./oss.js');

var cli = meow({
  help: [
    'Usage',
    '  oss_upload source  dest content_type',
    '',
    'Example',
    '  oss_upload aa.png  /aa.png  image/png'
  ].join('\n')
});

oss.putObject(cli.input[0], cli.input[1], cli.input[2]);
