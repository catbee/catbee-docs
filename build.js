require('babel-polyfill');
require('yamlify/register');

var catbee = require('catbee');
var handlebars = require('catbee-handlebars');
var babel = require('./services/browserify/babel');
var cssmodules = require('./services/browserify/cssmodules');
var yaml = require('./services/browserify/yaml');
var cssnano = require('./services/cssnano');
var assets = require('./services/assets');
var config = require('config');

var cat = catbee.create(config);

var logger = cat.locator.resolve('logger');
logger.dropEnrichments();
logger.addEnrichment(log => log.from = 'Bundler');

handlebars.register(cat.locator);
babel.register(cat.locator);
cssmodules.register(cat.locator);
yaml.register(cat.locator);
cssnano.register(cat.locator);
assets.register(cat.locator);

cat.build();
