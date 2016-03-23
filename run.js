require('yamlify/register');
require('localenv');

// Определеям какой режим работы компиляции ES6 -> ES5 использовать
var config = require('config');
require(config.isRelease ? 'babel-polyfill' : 'babel-register'); // В боевой сборке приложение компилируется в ES5

var http = require('http');
var app = require('./app');

/**
 * @param {Object} instance
 * @returns {Promise}
 */
function start (instance) {
  return http
    .createServer(instance)
    .listen(config.port);
}

app
  .create(config)
  .then(start);
