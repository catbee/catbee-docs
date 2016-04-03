var page = require('../actions/page');

exports.guide = [
  [
    page.loadDocument('guide'), {
      loaded: [
        page.setContent
      ]
    }
  ],
  page.setGuidePageComponents
];
