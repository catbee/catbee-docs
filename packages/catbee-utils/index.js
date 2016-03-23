var _ = require('lodash');

module.exports = {
  /**
   * Function decorator used for extend render results by static vars
   * @param {Object} data
   * @returns {Function}
   */
  extend: function (data) {
    return function safePromise (target, name, desc) {
      var func = desc.value;

      desc.value = function safe () {
        var renderResult;
        var context = {};

        try {
          renderResult = func.call(this, arguments);
        } catch (e) {
          return Promise.reject(e);
        }

        return Promise.resolve(renderResult).then(function (result) {
          return Object.assign(context, result, data);
        });
      }
    }
  },

  /**
   * Cut css composes classes and add '.' to string
   * @param {String} string
   * @returns {String|undefined}
   */
  cut: function (string) {
    if (!string) {
      return;
    }

    var firstClass = _.first(string.split(' '));
    return '.' + firstClass;
  }
};
