var fs = require('fs');
var path = require('path');
var child = require('child_process');
var cwd = process.env.PWD || process.cwd();

child.exec('git rev-parse --show-toplevel', function onRoot(err, output) {
  if (err) {
    console.error('Failed to find git root.');
    console.error(err);
    return process.exit(1);
  }

  var gitRoot = output.trim();
  var hookPath = path.join(gitRoot, '/.git/hooks/pre-push');

  fs.createReadStream(path.join(cwd, '/pre-push.js')).pipe(fs.createWriteStream(hookPath));
  fs.chmod(hookPath, '755');
});
