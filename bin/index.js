#!/usr/bin/env node --harmony

/**
 * 
 * Lightweight entry point for CLI tools
 *
 * Shouldn't need to be edited frequently
 *
 * - performs system specific checks
 * - loads up /src/main.js
 * 
 */
'use strict'

var path = require('path');
var chalk = require('chalk');
var isCompatible = performCompatibilityChecks();
var warningSymbol = '!'; // '\u26A0';

function performCompatibilityChecks() {
	var majorNodeVersion = process.versions.node.split(/\./)[0];

  // likely only need 4+ with --harmony flag
	if (majorNodeVersion < 6) {
		return `sorry, we require Node version 6 or higher`;
	}

	return true;
};

if (isCompatible !== true) {
	console.error(chalk.red.bold(`\t${warningSymbol}\t`), chalk.red(isCompatible));	
} else {
  var pkg = require('../package.json');
	module.exports = require(path.join('..', pkg.cli.main));
}
