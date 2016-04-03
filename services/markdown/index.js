var Remarkable = require('remarkable');

class Markdown {
  constructor ($uhr, $config) {
    this._uhr = $uhr;
    this._config = $config;
    this._remarkable = new Remarkable({ breaks: true });
  }

  /**
   * Load .md document and translate it into html
   * @param {String} filename
   * @return {Promise}
   */
  getDocument (filename) {
    return this._uhr
      .get(`${this._config.markdownPath}/${filename}.md`)
      .then((response) => this._remarkable.render(response.content));
  }
}

module.exports = {
  register (locator) {
    var config = locator.resolve('config');
    locator.register('markdown', Markdown, config, true);
  }
};
