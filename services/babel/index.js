var babelify = require('babelify');

module.exports = {
  register: function (locator) {
    var config = locator.resolve('config') || {};

    locator.registerInstance('browserifyTransformation', {
      transform: (stream) => {
        return babelify(stream, { sourceMaps: false });
      }
    });
  }
};
