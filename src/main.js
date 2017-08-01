const path = require('path');
const pkg = rootRequire('package.json');

const chalk = require('chalk');
const program = require('commander');

const fs = require('./fs');
const { cwdRelative, scriptPath } = require('./paths');
const { isDryRun, setDryRun } = require('./dryRun');

///////// Global configuration and options
program
  .version(pkg.version)
  .option('-d, --dry-run', `don't modify filesystem in any way`)
  .on('option:dry-run', function () {
    setDryRun(true);
  })

///////// Commands
program
  .command('noop [optional] [others...]')
  .option('-t, --ticks <v>', 'number of ticks in progress bar', (val) => parseInt(val, 10))
  .description('does nothing, just a demonstration')
  .action((optional, others, program) => {
    const ProgressBar = require('progress');

    var bar = new ProgressBar(
      `${chalk.cyan('doing nothing')} [:bar] :current / :total :percent`,
      { total: program.ticks || 30 }
    );
    var timer = setInterval(function() {
      bar.tick();
      if (bar.complete) {
        console.log(chalk.green('\ncomplete\n'));
        clearInterval(timer);
      }
    }, 100);
  });

///////// Entry point
program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}