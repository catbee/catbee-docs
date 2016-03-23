var _ = require('lodash');

require('./global.css');
var css = require('./document.css');

class Document {
  render () {
    var data = Object.create(null);
    data.css = css;

    if (this.$context.isBrowser) {
      return data;
    }

    var envVars = require('../../config/env');
    var browserDeniedVars = require('../../config/env.browser');

    return new Promise((resolve) => {
      setTimeout(() => {
        _.chain(envVars)
          .thru((vars) => {
            browserDeniedVars.forEach(key => _.unset(vars, key));
            return vars;
          })
          .thru((vars) => {
            data.ENV = JSON.stringify(vars);
            resolve(data);
          })
          .value();
      }, 0);
    });
  }
}

module.exports = Document;
