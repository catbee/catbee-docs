var fs = require('fs');

/**
 * @param {string} filePath
 * @returns {Promise}
 */
function readFile (filePath) {
  return new Promise(function toPromise (resolve, reject) {
    fs.readFile(filePath, function handleReading (err, content) {
      if (err) {
        reject(err);
        return;
      }

      resolve(content);
    });
  });
}

module.exports = readFile;
