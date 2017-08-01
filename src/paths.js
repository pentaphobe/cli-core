/**
 * Convenience functions for distinguishing between files
 * in the current path vs. files in the script path
 */

const appRootPath = require('app-root-path'),
      reqlib = appRootPath.require,
      rootPath = appRootPath.toString();

const path = require('path');

function scriptPath(filePath) {
  return path.join(rootPath, filePath);
}

function cwdPath(filePath) {
  return path.join(process.cwd(), filePath);
}

function scriptRelative(filePath) {
  return path.relative(rootPath, filePath);
}

function cwdRelative(filePath) {
  return path.relative(process.cwd(), filePath);
}

module.exports = {
  scriptPath,
  cwdPath,
  scriptRelative,
  cwdRelative,
  require: reqlib
};