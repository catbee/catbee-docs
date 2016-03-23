var _ = require('lodash');
var { resolve } = require('url');

/**
 * @constructor
 */
class Localhost {
  constructor ($serviceLocator) {
    this._locator = $serviceLocator;
    this._uhr = this._locator.resolve('uhr');
    this._config = this._locator.resolve('config');
    this._logger = this._locator.resolve('logger');
  }

  /**
   * @type {Logger}
   * @protected
   */
  _logger = null;

  /**
   * @type {ServiceLocator}
   * @protected
   */
  _locator = null;

  /**
   * @type {Object}
   * @protected
   */
  _config = null;

  /**
   * @type {UHR}
   * @private
   */
  _uhr = null;

  /**
   * @param {Object} context
   * @param {Object} params
   * @returns {Promise}
   */
  getTranslate (context, params) {
    return this._request('GET', `external/l10n`, params, context);
  }

  /**
   * @param {Object} context
   * @param {Object} params
   * @returns {Promise}
   */
  getLocaleData (context, params) {
    return this._request('GET', `external/i18n`, params, context);
  }

  /**
   * @protected
   */
  _request (method, slug, data, context, options = {}) {
    var base = this._base(context);
    var url = resolve(base, slug);

    return this._uhr.request(
      _.chain({
        method, url,
        data: _.isObject(data) ? _.omit(data, _.isUndefined) : data,
        headers: _.omit(options.headers, _.isUndefined),
        timeout: options.timeout
      })
      .defaultsDeep({
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .omit(_.isUndefined)
      .value()
    );
  }
}

module.exports = Localhost;
