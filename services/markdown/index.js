var Remarkable = require('remarkable');

class Markdown {
  constructor ($uhr) {
    this._uhr = $uhr;
    this._remarkable = new Remarkable({ 
      breaks: true
    });
  }

  /**
   * Load .md document and translate it into html
   * @param {String} filename
   * @return {Promise}
   */
  getDocument (filename) {
    return this._uhr
      .get(`http://127.0.0.1:3000/public/assets/markdown/${filename}.md`)
      .then((response) => this._remarkable.render(response.content));
  }
}

module.exports = {
  register (locator) {
    var config = locator.resolve('config');
    locator.register('markdown', Markdown, config, true);
  }
};
