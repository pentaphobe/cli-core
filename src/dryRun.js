/**
 *
 * A lightweight settings wrapper for dry run
 *
 * Used by other modules to prevent filesystem / git / service changes
 * 
 */

const chalk = require('chalk');
let isDryRun = false;

module.exports = {
  isDryRun: () => isDryRun,
  setDryRun: (val) => {
    isDryRun = !!val;
    // if (val) {
    console.log(chalk.magenta(`## Dry Run ${chalk.bold(val ? 'ON' : 'OFF')}`));
    // }
  },
}