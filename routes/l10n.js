var _ = require('lodash');
var config = require('config');

module.exports = (req, res) => {
  var locale = _.get(req, 'query.locale', config.l10n.default);

  if (_.includes(config.l10n.available.translates, locale)) {
    var path = `../l10n/${locale}/LC_MESSAGES/messages.json`;

    try {
      let translate = require(path);

      res.status(200).json(translate);
    } catch (e) {
      res.sendStatus(404);
    }

    return;
  }

  res.sendStatus(404);
};
