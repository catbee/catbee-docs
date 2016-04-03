var ncp = require('ncp').ncp;

ncp.limit = 16;

module.exports = {
  /**
   * @param {ServiceLocator} locator Catberry's service locator.
   */
  register (locator) {
    locator.registerInstance('postBuildAction', {
      action: () => {
        return new Promise((resolve) => {
          ncp('./assets', './build/public/assets', resolve);
        });
      }
    });
  }
};
