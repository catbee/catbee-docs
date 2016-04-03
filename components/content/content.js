var css = require('./content.css');
var extend = require('catbee-utils').extend;

class Content {
  @extend({ css })
  render () {
    return this.$context.getWatcherData();
  }
}

module.exports = Content;
