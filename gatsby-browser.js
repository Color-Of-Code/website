/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
require('prismjs/themes/prism-tomorrow.css');
require('./src/styles/prismjs-custom.css');

// MathJax will process all math equations when the location changed.
exports.onRouteUpdate = () => {
  try {
    if (window.MathJax !== undefined) {
      window.MathJax.typeset();
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
