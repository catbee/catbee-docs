var css = require('./header.css');
var extend = require('catbee-utils').extend;

class Header {
  @extend({ css })
  render () {
    return this.$context.getWatcherData();
  }
}

module.exports = Header;
