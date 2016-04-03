var css = require('./splash.css');
var { cut, extend } = require('catbee-utils');
var _ = require('lodash');

const SELECTOR_CONTENT = cut(css.content);
const SELECTOR_VISIBLE = cut(css.visible).substring(1);

class Splash {
  @extend({ css })
  render () {
    return this.$context.getWatcherData();
  }

  bind () {
    _.delay(() => {
      document
        .querySelector(SELECTOR_CONTENT)
        .classList.add(SELECTOR_VISIBLE);
    }, 50);
  }
}

module.exports = Splash;
