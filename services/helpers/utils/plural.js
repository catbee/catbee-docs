var _ = require('lodash');
var cache = {};

/**
 * @param {string} form
 * @return {function}
 */
module.exports = function parsePluralForm (form) {
  if (!form) {
    return getPluralIndex;
  }

  if (_.isFunction(cache[form])) {
    return cache[form];
  }

  var re = /^(\s*nplurals\s*=\s*[0-9]+\s*;\s*plural\s*=\s*(?:\s|[-\?\|&=!<>+*/%:;a-zA-Z0-9_()])+)/m;

  if (re.test(form)) {
    var pf = form;
    if (!/;\s*$/.test(pf)) {
      pf += ';';
    }

    var code = `
      var plural;
      var nplurals;
      ${pf}
      return (plural === true ? 1 : plural ? plural : 0);
    `;

    try {
      cache[form] = new Function('n', code); // eslint-disable-line no-new-func
      return cache[form];
    } catch (e) {
      return () => 0;
    }
  }

  throw new SyntaxError(`Plural-Forms is invalid [${form}]`);
};

/**
 * @param {int} num
 * @returns {int}
 */
function getPluralIndex (num) {
  var number = Math.abs(num);

  var mod10 = number % 10;
  var mod100 = number % 100;

  if (mod100 >= 5 && mod100 <= 20) {
    return 2;
  }
  if (mod10 == 1) {
    return 0;
  }
  return mod10 >= 2 && mod10 <= 4 ? 1 : 2;
}
