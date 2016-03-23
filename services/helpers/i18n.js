var getPluralFunction:Function = require('./utils/plural');
var injectVariables:Function = require('./utils/inject');
var _ = require('lodash');

var glue = '\u0004';
exports.glue = glue;

/**
 * @param {Object} l10n
 * @param {number} number
 * @returns {{plural: *[], n: *}}
 */
function calculatePlural (l10n, number) {
  /**
   * @type {Function}
   */
  var rule = getPluralFunction(_.get(l10n, ['', 'plural-forms']));

  return rule(number);
}

exports.calculatePlural = calculatePlural;

exports.main = {
  /**
   * @param {string} str
   * @param {Object} options
   * @returns {string}
   * @public
   */
  _t (str, options) {
    var l10n = _.get(options, 'data.root.l10n');

    var template = _.get(l10n, [str, 1], str);

    return injectVariables.call(this, template);
  },

  /**
   * @param {string} context
   * @param {string} str
   * @param {Object} options
   * @returns {string}
   * @public
   */
  _pt (context, str, options) {
    var l10n = _.get(options, 'data.root.l10n');

    var template = _.get(l10n, [`${context}${glue}${str}`, 1], str);

    return injectVariables.call(this, template);
  },

  /**
   * @param {string} str
   * @param {string} plural1
   * @param {string} plural2
   * @param {number} number
   * @param {Object} options
   * @returns {string}
   * @public
   */
  _nt (str, plural1, plural2, number, options) {
    var l10n = _.get(options, 'data.root.l10n');

    var plural = [str, plural1, plural2];
    var n = calculatePlural(l10n, number);

    var template = _.get(l10n, [str, n + 1], plural[n]);

    return injectVariables.call(this, template);
  },

  /**
   * @param {string} context
   * @param {string} str
   * @param {string} plural1
   * @param {string} plural2
   * @param {number} number
   * @param {Object} options
   * @returns {string}
   * @public
   */
  _npt (context, str, plural1, plural2, number, options) {
    var l10n = _.get(options, 'data.root.l10n');

    var plural = [str, plural1, plural2];
    var n = calculatePlural(l10n, number);

    var template = _.get(l10n, [`${context}${glue}${str}`, n + 1], plural[n]);

    return injectVariables.call(this, template);
  }
};

exports.excludes = {
  _gg: exports.main._t,
  _pgg: exports.main._pt,
  _ngg: exports.main._nt,
  _npgg: exports.main._npt
};
