var css = require('./plugins.css');
var extend = require('catbee-utils').extend;

class Plugins {
  @extend({ css })
  render () {
    return this.$context.getWatcherData();
  }
}

module.exports = Plugins;
