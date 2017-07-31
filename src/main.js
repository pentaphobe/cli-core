const path = require('path');
const program = require('commander');
const pkg = rootRequire('package.json');

///////// Global configuration and options
program
  .version(pkg.version)
  .option('-d, --dry-run', `don't modify filesystem in any way`)

///////// Commands
program
  .command('noop [optional] [others...]')
  .description('does nothing, just a demonstration')
  .action( (optional, others, program) => {
    console.dir({
      optional: optional,
      others: others,
      dryRun: program.parent.dryRun
    });
  })

program
  .parse(process.argv)

if (program.args.length === 0) {
  program.help();
}