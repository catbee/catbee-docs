var _ = require('lodash');
var helpers = require('./../helpers/i18n');

/**
 * @param {function} func
 * @return {function}
 */
function wrapHelper (func) {
  var funcLen = func.length;

  return (...args) => {
    if (args.length !== funcLen) {
      throw new SyntaxError(`Invalid arguments length for ${func.name}`);
    }

    var root = args.pop();
    var options = {
      data: { root }
    };

    return func.apply(root, args.concat(options));
  };
}

/**
 * @param {Object} module
 * @returns {Object}
 */
function wrap (module) {
  var wrapped = {};

  _.each(module, (func, name) => {
    wrapped[name] = wrapHelper(func);
  });

  return wrapped;
}

module.exports = {
  ...wrap(helpers.main),
  ...wrap(helpers.excludes)
};
