var page = require('../actions/page');

exports.plugins = [
  [
    page.loadDocument('plugins'), {
      loaded: [
        page.setContent
      ]
    }
  ],
  page.setPluginsPageComponents
];
