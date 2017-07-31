/**
 * 
 * Sets up some project defaults when cloned
 *
 */

const path = require('path');

const inquirer = require('inquirer');
const chalk = require('chalk');
const semver = require('semver');
const validatePackageName = require('validate-npm-package-name');
const init = require('init-package-json');

const paths = require('../src/paths');
let pkg = require('../package.json');


/** 
 * 
 * Questions for package.json updates
 *
 * Try to keep these in order of importance
 * 
 * The higher the chance someone will accept the default, the lower it should
 * be in the list
 * 
 */
const questions = [
  {
    name: 'name',
    message: 'Project name',
    type: 'input',
    validate: (name) => validatePackageName(name).validForNewPackages,
    default: path.basename(path.dirname(path.resolve(paths.scriptPath(''))))    
  },
  {
    name: 'description',
    message: 'Description',
    type: 'input',
    default: pkg.description    
  },  
  {
    name: 'command',
    message: 'command name',
    type: 'input',
    validate: (name) => /[a-z0-9_\-]+/.test(name),
    default: (answers) => answers.name
  },
  {
    name: 'version',
    message: 'Version',
    type: 'input',
    validate: (ver) => semver.valid(ver) === ver,
    default: pkg.version    
  },    
  {
    name: 'entryPoint',
    message: 'Main script',
    type: 'input',
    default: pkg.cli.main
  },
  {
    name: 'repository',
    message: 'Repository location (cli-core will remain as upstream)',
    type: 'input',
    // TODO: actual repo URL validation
    validate: (name) => /^(github|git|git\+ssh|http|https)\:\/\//.test(name),
    default: (answers) => `git+ssh://git@github.com/pentaphobe/${answers.name}.git`
  }
];


/**
 * 
 * Entry point
 * 
 */
var prompt = inquirer.createPromptModule();

console.log(chalk.cyan.bold(`--- CLI Core Initialisation/Configuration\n`));

prompt(questions)
  .then(function (answers) {    
    pkg.name = answers.name;
    pkg.description = answers.description;
    pkg.cli.main = answers.entryPoint;
    
    // TODO: update `repository`, `homepage`, and `bugs` keys

    savePackage(pkg);
  })


/**
 *
 * Internal functions
 * 
 */

function savePackage(pkg) {
  if (pkg.name === 'cli-core') {
    console.error(chalk.red.bold(`not overwriting package.json: `), chalk.red(`your project name is still "cli-core", please change it`));
    console.log('### Resulting package.json');
    console.dir(pkg, {colors: true});
    system.exit(-1);
  }

  var initFile = path.resolve(process.env.HOME, '.npm-init')
  
  var dir = paths.scriptPath('');

  init(dir, initFile, pkg, function callback (err, data) {
    if (!err) {
      console.log(chalk.green('saved package.json'));
    }
  });
}