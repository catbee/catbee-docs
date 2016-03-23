var glob = require('glob');

/**
 * @param {Array<string>|string} globPattern
 * @returns {Array}
 */
function getFiles (globPattern) {
  var patterns = [];

  if (typeof globPattern === 'string') {
    patterns = [globPattern];
  } else if (Array.isArray(globPattern)) {
    patterns = patterns.concat(globPattern);
  }

  var files = [];

  patterns.forEach(function applyPattern (pattern) {
    files = files.concat(glob.sync(pattern));
  });

  return files;
}

module.exports = getFiles;
