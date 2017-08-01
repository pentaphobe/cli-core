/**
 * postinstall script
 */
'use strict';

const chalk = require('chalk');

console.log(
  chalk.green.bold('postinstall:'), 
  chalk.green(`
    this is a placeholder
    postinstall should actually point at tasks/init`));

require('./init');

