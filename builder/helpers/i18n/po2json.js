var po2json = require('po2json');
var getFiles = require('../get-files');
var readFile = require('../read-file');
var writeFile = require('../write-file');
var path = require('path');
var _ = require('lodash');

// po2json converter
var files = getFiles(path.join(process.cwd(), 'l10n/**/*.po'));

_.each(files, handleFile);

function handleFile (filePath) {
  return readFile(filePath)
    .then(convert)
    .then(pickPlural)
    .then(_.partial(toJSON, filePath))
    .then(handleJSON)
    .then(onSuccess)
    .catch(processExit);

  function handleJSON (json) {
    return writeFile(json.filePath, json.content);
  }

  function onSuccess () {
    successHandler(filePath);
  }
}

/**
 * @param {string} filePath
 * @param {Object} json
 * @returns {{filePath, content}}
 */
function toJSON (filePath, json) {
  var jsonName = path.basename(filePath, '.po') + '.json';
  var dir = path.dirname(filePath);
  var jsonPath = path.join(dir, jsonName);

  return {
    filePath: jsonPath,
    content: JSON.stringify(json)
  };
}

/**
 * @param {Buffer} content - .po file content.
 * @returns {Object}
 */
function convert (content) {
  var options = {
    pretty: false,
    fuzzy: false,
    stringify: false,
    commonJs: true,
    format: 'raw',
    ext: '.js',
    debug: false
  };

  return po2json.parse(content.toString(), options);
}

/**
 * @param {Object} json
 * @returns {Object}
 */
function pickPlural (json) {
  json[''] = _.chain(json)
    .get('')
    .pick('plural-forms')
    .value();

  return json;
}

/**
 * @param {string} filePath
 */
function successHandler (filePath) {
  console.log(filePath, 'is written'); // eslint-disable-line no-console
}

function processExit (e) {
  console.error(e); // eslint-disable-line no-console
  process.exit(1);
}
