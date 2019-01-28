const visit = require('unist-util-visit');

module.exports = ({ markdownAST }, { language = 'flowchart' } = {}) => {
  visit(markdownAST, 'code', node => {
    let lang = (node.lang || '').toLowerCase();
    // console.info(`lang is ${lang}`)
    if (lang === language) {
      node.type = 'html';
      node.value = `<div class="coc-flowchart">${node.value}</div>`;
    }
  });
};
