var i18n = require('./i18n');

module.exports = {
  register (locator) {
    try {
      var handlebars = locator.resolve('handlebars');
      
      handlebars.registerHelper('_t', i18n.main._t);
      handlebars.registerHelper('_pt', i18n.main._pt);
      handlebars.registerHelper('_nt', i18n.main._nt);
      handlebars.registerHelper('_npt', i18n.main._npt);
      handlebars.registerHelper('_gg', i18n.excludes._gg);
      handlebars.registerHelper('_pgg', i18n.excludes._pgg);
      handlebars.registerHelper('_ngg', i18n.excludes._ngg);
      handlebars.registerHelper('_npgg', i18n.excludes._npgg);
    } catch (e) {
      locator
        .resolve('logger')
        .fatal(e);
    }
  }
};
