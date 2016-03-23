require('babel-polyfill');

// Dependencies
var catbee = require('catbee');
var handlebars = require('catbee-handlebars');
var config = require('config');
var i18n = require('./services/i18n');
var helpers = require('./services/helpers');
var localhost = require('./services/localhost/browser');
var history = require('./services/history');
var search = require('./services/search');

// App instance
var cat = catbee.create(config);

// Services
handlebars.register(cat.locator);
search.register(cat.locator);
i18n.register(cat.locator);
helpers.register(cat.locator);
localhost.register(cat.locator);
history.register(cat.locator);

// Startup
cat.startWhenReady();
