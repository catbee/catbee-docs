/**
 * ENV -> JS config mapping
 * @see env.browser.js
 * @type {Object}
 */
module.exports = {
  port: process.env.PORT,
  timeout: process.env.API_TIMEOUT === 'true', // env vars can be only strings
  isRelease: process.env.NODE_ENV === 'production', // env vars can be only strings
  logger: {
    levels: process.env.LOGGER_LEVELS
  },
  cssmodules: {
    scopedName: process.env.NODE_ENV === 'production' ? '[local]__[hash:base64:5]' : '[component]__[local]',
    output: './build/public/bundle.css'
  },
  markdownPath: process.env.MARKDOWN_PATH
};
