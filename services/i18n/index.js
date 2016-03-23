var i18n = require('./i18n');

module.exports = {
  register (locator) {
    locator.registerInstance('i18n', i18n);
  }
};
