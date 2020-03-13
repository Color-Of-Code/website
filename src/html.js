import React from 'react';
import PropTypes from 'prop-types';

const MathJaxConfig = `
window.MathJax = {
  svg: {
    fontCache: 'global'
  },
  tex: {
    inlineMath: [['$', '$'] ],
    displayMath: [['$$', '$$'] ],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
  }
};
`;

export default class HTML extends React.Component {
  render() {
    return (
      <html lang="en" {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={'body'}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
          <script dangerouslySetInnerHTML={{ __html: MathJaxConfig }} />
          <script
            type="text/javascript"
            id="MathJax-script"
            defer
            src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg-full.js"
          ></script>
        </body>
      </html>
    );
  }
}

HTML.defaultProps = {
  htmlAttributes: null,
  headComponents: [],
  bodyAttributes: null,
  preBodyComponents: [],
  body: '',
  postBodyComponents: [],
};

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
