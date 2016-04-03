var css = require('./splash.css');
var extend = require('catbee-utils').extend;

class Splash {
  @extend({ css })
  render () {
    return this.$context.getWatcherData();
  }
}

module.exports = Splash;
