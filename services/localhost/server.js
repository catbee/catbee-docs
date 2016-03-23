var Localhost = require('./localhost');

class ServerLocalhost extends Localhost {
  constructor ($serviceLocator) {
    super($serviceLocator);
  }

  /**
   * Url для запроса к серверу от сервера.
   *
   * Никакого https тут быть не может.
   *
   * @returns {string}
   * @protected
   */
  _base () {
    return `http://127.0.0.1:${this._config.port}/`;
  }
}

module.exports = {
  /**
   * @param {ServiceLocator} locator
   */
  register (locator) {
    var config = locator.resolve('config');

    locator.register('localhost', ServerLocalhost, config, true);
  }
};
