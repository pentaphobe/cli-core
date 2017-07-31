/**
 * Convenience functions for distinguishing between files
 * in the current path vs. files in the script path
 */

const path = require('path');

function scriptPath(filePath) {
  return path.join(__dirname, filePath);
}

function cwdPath(filePath) {
  return path.join(process.cwd(), filePath);
}

function scriptRelative(filePath) {
  return path.relative(__dirname, filePath);
}

function cwdRelative(filePath) {
  return path.relative(process.cwd(), filePath);
}

module.exports = {
  scriptPath,
  cwdPath,
  scriptRelative,
  cwdRelative
};