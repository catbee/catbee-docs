var _ = require('lodash');

const ENV = global.ENV || {};
const BASE = require('./base.yml');
const BROWSER = require('./browser.yml');
const CONFIG = Object.create(null);

module.exports = Object.assign(CONFIG, BASE, BROWSER, _.omit(ENV, _.isUndefined));
