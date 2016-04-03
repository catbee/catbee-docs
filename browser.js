require('babel-polyfill');

// Dependencies
var catbee = require('catbee');
var handlebars = require('catbee-handlebars');
var config = require('config');
var localhost = require('./services/localhost/browser');
var uhr = require('catberry-uhr');
var markdown = require('./services/markdown');

// App instance
var cat = catbee.create(config);

// Services
handlebars.register(cat.locator);
localhost.register(cat.locator);
uhr.register(cat.locator);
markdown.register(cat.locator);

// Startup
cat.startWhenReady();
