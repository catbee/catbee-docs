var css = require('./guide.css');
var extend = require('catbee-utils').extend;

class Guide {
  @extend({ css })
  render () {
    return this.$context.getWatcherData();
  }
}

module.exports = Guide;
