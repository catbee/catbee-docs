var _ = require('lodash');

/**
 * @example:
 *  this = { n1: 'боль', n2: 'Руди' };
 *  function.call(this, '$n1 у $n2 от твоего кода') == 'боль у Руди от твоего кода'
 *
 * @param {string} str
 * @return {string}
 */
module.exports = function injectVariables (str = '') {
  var re = /\$[a-zA-Z]+[a-zA-Z0-9.]*/g;

  return str.replace(re, (path) => validateArgument(path, _.get(this, path.substr(1))));
};

/**
 * @param {string} path - переменная для инжекта.
 * @param {string|number} value
 * @return {string|number}
 */
function validateArgument (path, value) {
  if (!/(string|number)/.test(typeof value)) {
    return `value ${path} is not a number or string`;
  }

  return value;
}
