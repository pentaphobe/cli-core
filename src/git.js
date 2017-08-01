
const paths = require('./paths');
const simpleGit = require('simple-git')(paths.scriptPath('.'));
const {isDryRun, dryLog} = require('./dryRun');

function forkUpstreams(newRemote, callback) {
  var promise = new Promise((resolve, reject) => {
    simpleGit.getRemotes(true, function (err, remotes) {
      let origin = remotes.find(rem => rem && rem.name === 'origin');

      if (err || !origin) {
        reject(err);
      } else {
        if (isDryRun()) {
          dryLog('remove remote: origin');
          dryLog(`set remote: upstream to '${origin.refs.fetch}'`);
          dryLog(`set remote: origin to '${newRemote}'`);
        } else {
          simpleGit.removeRemote('origin', (err) => {
            simpleGit
              .addRemote('origin', newRemote)
              .addRemote('upstream', origin.refs.fetch);
          });
        }
        resolve('hello mudda');        
      }
    });
  });

  return promise;
}

module.exports = {
  forkUpstreams
};