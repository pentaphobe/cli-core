const path = require('path');
const pkg = rootRequire('package.json');

const chalk = require('chalk');
const program = require('commander');

///////// Global configuration and options
program
  .version(pkg.version)
  .option('-d, --dry-run', `don't modify filesystem in any way`)

///////// Commands
program
  .command('noop [optional] [others...]')
  .description('does nothing, just a demonstration')
  .action( (optional, others, program) => {
    const ProgressBar = require('progress');

    var bar = new ProgressBar(`${chalk.blue('doing nothing')} [:bar] :current / :total :percent`, { total: 30 });
    var timer = setInterval(function () {
      bar.tick();
      if (bar.complete) {
        console.log(chalk.green("\ncomplete\n"));
        clearInterval(timer);
      }
    }, 100);

  })

///////// Entry point
program
  .parse(process.argv)

if (program.args.length === 0) {
  program.help();
}