var css = require('./layout.css');
var extend = require('catbee-utils').extend;

class Layout {
  @extend({ css })
  render () {
    return this.$context.getWatcherData();
  }
}

module.exports = Layout;
