var page = require('../actions/page');

exports.api = [
  [
    page.loadDocument('api'), {
      loaded: [
        page.setContent
      ]
    }
  ],
  page.setApiPageComponents
];
