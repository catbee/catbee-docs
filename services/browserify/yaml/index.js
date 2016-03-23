var yamlify = require('yamlify');

/**
 * @type {{register: Function}}
 */
module.exports = {
  register: (locator) => locator.registerInstance('browserifyTransformation', {
    transform: (stream) => yamlify(stream)
  })
};
