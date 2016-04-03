const components = {
  splash: [
    {
      name: 'splash',
      id: 'splash'
    }
  ],
  api: [
    {
      name: 'header',
      id: 'header'
    },
    {
      name: 'article',
      id: 'article'
    }
  ],
  guide: [
    {
      name: 'header',
      id: 'header'
    },
    {
      name: 'guide',
      id: 'guide'
    }
  ],
  plugins: [
    {
      name: 'header',
      id: 'header'
    },
    {
      name: 'plugins',
      id: 'plugins'
    }
  ]
};

module.exports = {
  setSplashPageComponents (args, state) {
    state.set(['components'], components.splash);
  },

  setApiPageComponents (args, state) {
    state.set(['components'], components.api);
  },

  setGuidePageComponents (args, state) {
    state.set(['components'], components.guide);
  },

  setPluginsPageComponents (args, state) {
    state.set(['components'], components.plugins);
  },

  loadDocument (name) {
    return function loadDocument (args, state, output, { locator }) {
      locator
        .resolve('markdown')
        .getDocument(name)
        .then((html) => output.loaded({ html }));
    }
  },

  setContent ({ html }, state) {
    state.set('html', html);
  }
};
