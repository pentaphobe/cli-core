/**
 * Acts as a wrapper to graceful-fs / fs
 *
 * Avoids littering entire codebase with dry-run checks
 *
 * TODO: currently doesn't provide sensible defaults, just returns true
 */

const fs = require('graceful-fs');
const chalk = require('chalk');
const writeJsonFile = require('write-json-file');
const { isDryRun, setDryRun } = require('./dryRun');

let methods = {};
let methodNames = [
  'readFileSync',
  'fstatSync',
  function existsSync(path) {    
    // custom handler
    if (isDryRun()) {
      report('existsSync', path);
      return true;
    }
    return fs.existsSync(path);
  },
  function writeJsonFile(filename, data) {
    if (isDryRun()) {
      // return an empty promise
      return new Promise(function (resolve, reject) {
        resolve('dry run mode');
      })
    }
    // return writeJsonFile(filename, data);
  }
];

/**
 * Generic handler for wrapping dry run functionality
 * 
 * @param  {string}   funcName the name 
 * @param  {Function} fn       the actual function to override
 * @param  {Object}   ctx      the `this` to use
 * @return {[type]}            whatever the wrapped function returns
 */
function wrap(funcName, fn, ctx) {
  return function wrapped() {
    let args = Array.prototype.slice.call(arguments);

    if (isDryRun()) {
      // console.log(chalk.magenta(`dry-run ${funcName}:\n  `), args);
      report(funcName, args)
      return true;
    }

    return fn.apply(this, args);
  }
}

methodNames.forEach( name => 
  typeof name === 'string' 
    ? methods[name] = wrap(name, fs[name], fs) 
    : methods[name.name] = name );

module.exports = methods;

function report(message/* ,args... */) {
  let args = Array.prototype.slice.call(arguments, 1);
  console.log(chalk.magenta(`dry-run ${message}:\n  `), args.map(v => JSON.stringify(v)).join(', '));
}