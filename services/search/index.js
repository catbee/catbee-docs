var algolia = require('algoliasearch');
var helper = require('algoliasearch-helper');
var _ = require('lodash');

class Search {
  constructor ($config) {
    this._config = $config;
    this._client = algolia(this._config.algolia.id, this._config.algolia.key);
  }

  /**
   * Config ref.
   * @type {Object}
   * @private
   */
  _config = null;

  /**
   * Algolia client ref.
   * @type {AlgoliaSearch}
   * @private
   */
  _client = null;
}

module.exports = {
  /**
   * @param {ServiceLocator} locator
   */
  register (locator) {
    var config = locator.resolve('config');
    locator.register('search', Search, config, true);
  }
};
