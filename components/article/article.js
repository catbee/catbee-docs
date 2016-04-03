var css = require('./article.css');
var extend = require('catbee-utils').extend;

class Article {
  @extend({ css })
  render () {
    return this.$context.getWatcherData();
  }
}

module.exports = Article;
