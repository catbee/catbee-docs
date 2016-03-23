var fs = require('fs');

function writeFile (filePath, content) {
  return new Promise(function toPromise (resolve, reject) {
    fs.writeFile(filePath, content, 'utf8', function handleWriting (err) {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports = writeFile;
