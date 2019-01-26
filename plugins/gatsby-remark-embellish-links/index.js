'use strict';

const visit = require('unist-util-visit');
const defaultSites = require('./sites');
//var urlExists = require('url-exists');

module.exports = ({ markdownAST }, { sites } = {}) => {
  visit(markdownAST, 'link', node => {
    const linkMap = sites || defaultSites;

    for (var icon in linkMap) {
      if (node.url.match(linkMap[icon])) {
        node.children.unshift({
          type: 'html',
          value: `<i class="${icon}"></i>`,
        });
        // TODO: allow this check via a npm task somehow
        //urlExists(node.url, function(err, exists) {
        //  if (!exists) {
        //    console.log('URL ERROR: ' + node.url);
        //  }
        //});

        // first hit wins
        return;
      }
    }
  });
};

//module.exports.setParserPlugins = () => [remarkMath];
