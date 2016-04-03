var catbee = require('catbee');
var express = require('express');
var handlebars = require('catbee-handlebars');
var path = require('path');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var csshook = require('css-modules-require-hook');
var scopedNames = require('./services/helpers/scopedNames.js');
var localhost = require('./services/localhost/server');
var uhr = require('catberry-uhr');
var markdown = require('./services/markdown');

/**
 * @param {Object} config - application config
 * @returns {Promise} - express app
 */
exports.create = function create (config) {
  var cat = catbee.create(config);
  var app = express();
  var publicDirectoryPath = path.join(__dirname, config.publicDirectoryPath);

  // CSSModules
  var customPattern = config.cssmodules.scopedName;
  var componentFinder = cat.locator.resolve('componentFinder');
  var componentResolver = componentFinder._recognizeComponent.bind(componentFinder);
  var generateScopedName = scopedNames.getScopedNameGenerator(customPattern, componentResolver, process.cwd());

  csshook({
    generateScopedName,
    devMode: !config.isRelease
  });

  // Services
  handlebars.register(cat.locator);
  localhost.register(cat.locator);
  uhr.register(cat.locator);
  markdown.register(cat.locator);

  // Middleware
  app.use(compression());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(cat.getMiddleware());
  app.use(config.publicUriPath, express.static(publicDirectoryPath));

  // Events
  cat.events.on('ready', function log () {
    var logger = cat.locator.resolve('logger');
    logger.trace(`Catbee application ready to work on port: ${config.port}`);
  });

  return Promise.resolve(app);
};
