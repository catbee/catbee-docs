var _ = require('lodash');
var path = require('path');
var genericNames = require('generic-names');

module.exports = {
  getComponentName (filepath, resolveAction) {
    var component = resolveAction(filepath);
    return component ? component.name : '';
  },

  getFilePrefix (filepath) {
    var file = path.parse(filepath);
    return file ? _.camelCase(path.basename(file.dir) + '_' + file.name) : '__';
  },

  getPatternInterpolations (resolver, fileFinder) {
    var interComponent = (act, component) => {
      var name = act(this.getComponentName(component.filepath, resolver));
      return name || fileFinder(component.filepath);
    };

    return {
      component: interComponent.bind(this, _.camelCase)
    };
  },

  getGenericPattern (pattern, interpolations, params) {
    var result = pattern;
    for (var key in interpolations) {
      if (interpolations.hasOwnProperty(key)) {
        var part = `[${key}]`;
        if (result.includes(part)) {
          result = result.replace(part, interpolations[key](params));
        }
      }
    }
    return result;
  },

  getAssetPath (cwd, filepath) {
    var relativepath = cwd ? path.relative(cwd, filepath) : filepath;
    return relativepath.startsWith('/') ? relativepath.slice(1) : relativepath;
  },

  generateScopedName (cwd, pattern, interpolations, name, filepath, css) {
    var assetPath = this.getAssetPath(cwd, filepath);
    var genericPattern = this.getGenericPattern(pattern, interpolations, {
      name, filepath: assetPath, css
    });
    return genericNames(genericPattern)(name, assetPath);
  },

  getScopedNameGenerator (customPattern, componentResolver, cwd) {
    var patternInterpolations = this.getPatternInterpolations(componentResolver, this.getFilePrefix);
    return this.generateScopedName.bind(this, cwd, customPattern, patternInterpolations);
  }
};
