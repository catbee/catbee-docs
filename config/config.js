var _ = require('lodash');

const ENV = require('./env');
const BASE = require('./base.yml');
const APP = require('./app.yml');
const CONFIG = Object.create(null);

module.exports = Object.assign(CONFIG, BASE, APP, _.omit(ENV, _.isUndefined));
