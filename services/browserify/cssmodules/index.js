var cssmodules = require('css-modulesify');
var autoprefixer = require('autoprefixer');
var svg = require('postcss-svg');
var mixins = require('postcss-mixins');
var vars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var rgba = require('postcss-hexrgba');
var scopedNames = require('../../helpers/scopedNames.js');

/**
 * CSS Modules as Catbee Service
 * @type {{register: Function}}
 */
module.exports = {
  register: (locator) => {
    var config = locator.resolve('config') || {};

    var plugins = [
      svg(config.postcss.svg),
      mixins(config.postcss.mixins),
      vars(),
      nested(),
      rgba(),
      autoprefixer(config.postcss.autoprefixer)
    ];

    var customPattern = config.cssmodules.scopedName;
    var componentFinder = locator.resolve('componentFinder');
    var componentResolver = componentFinder._recognizeComponent.bind(componentFinder);
    var generateScopedName = scopedNames.getScopedNameGenerator(customPattern, componentResolver);

    locator.registerInstance('browserifyPlugin', {
      plugin: cssmodules,
      options: Object.assign({
        after: plugins,
        generateScopedName
      }, config.cssmodules)
    });
  }
};
