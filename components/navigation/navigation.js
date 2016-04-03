var css = require('./navigation.css');
var extend = require('catbee-utils').extend;

class Navigation {
  @extend({ css })
  render () {
    return this.$context.getWatcherData();
  }
}

module.exports = Navigation;
