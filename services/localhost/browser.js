var Localhost = require('./localhost');

class BrowserLocalhost extends Localhost {
  constructor ($serviceLocator) {
    super($serviceLocator);
  }

  /**
   * @returns {string}
   * @protected
   */
  _base () {
    let window = this._locator.resolve('window');
    let protocol = window.location.protocol;
    let host = window.location.host;

    return `${protocol}//${host}/`;
  }
}

module.exports = {
  /**
   * @param {ServiceLocator} locator
   */
  register (locator) {
    var config = locator.resolve('config');

    locator.register('localhost', BrowserLocalhost, config, true);
  }
};
