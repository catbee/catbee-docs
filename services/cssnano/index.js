var cssnano = require('cssnano');
var fs = require('fs');

module.exports = {
  /**
   * @param {ServiceLocator} locator Catberry's service locator.
   */
  register (locator) {
    var config = locator.resolve('config');

    locator.registerInstance('postBuildAction', {
      action: () => {
        if (!config.isRelease) {
          return Promise.resolve();
        }

        var css = fs.readFileSync('build/public/bundle.css', 'utf-8');

        return cssnano.process(css)
          .then((result) => {
            fs.writeFileSync('build/public/bundle.css', result.css);
          });
      }
    });
  }
};
