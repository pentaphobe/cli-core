/**
 *
 * A lightweight settings wrapper for dry run
 *
 * Used by other modules to prevent filesystem / git / service changes
 * 
 */

const chalk = require('chalk');
let isDryRun = false;

function report(message/* ,args... */) {
  let args = Array.prototype.slice.call(arguments, 1);
  console.log(chalk.magenta(`dry-run ${message}:\n  `), args.map(v => JSON.stringify(v)).join(', '));
}

module.exports = {
  isDryRun: () => isDryRun,
  setDryRun: (val) => {
    isDryRun = !!val;
    // if (val) {
    console.log(chalk.magenta(`## Dry Run ${chalk.bold(val ? 'ON' : 'OFF')}`));
    // }
  },
  dryLog: report
}