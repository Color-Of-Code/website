'use strict';

const visit = require('unist-util-visit');
const defaultSites = require('./sites');

module.exports = ({ markdownAST }, { sites } = {}) => {
  visit(markdownAST, 'link', node => {
    const linkMap = sites || defaultSites;

    Object.keys(linkMap).forEach(icon => {
      if (node.url.match(linkMap[icon])) {
        node.children.unshift({
          type: 'html',
          value: `<i class="${icon}"></i>`,
        });
        // first hit wins
        return;
      }
    });
  });
};

//module.exports.setParserPlugins = () => [remarkMath];
