var _ = require('lodash');
var config = require('config');

module.exports = (req, res) => {
  var locale = _.get(req, 'query.locale', config.i18n.default);
  var path = `../i18n/${locale}.yml`;

  try {
    let data = require(path);
    res.status(200).json(data);
  } catch (e) {
    res.sendStatus(404);
  }
};
