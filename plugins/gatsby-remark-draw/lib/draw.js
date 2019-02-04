'use strict';

module.exports = class Draw {
  constructor(className) {
    const skyrta = require('skyrta');

    this.languages = new Map();
    this.languages.set('bob-svg', { language: 'bob', generator: skyrta });
    this.languages.set('dot-svg', { language: 'dot', generator: skyrta });
    this.languages.set('mermaid-svg', {
      language: 'mermaid',
      generator: skyrta,
    });
    this.languages.set('plantuml-svg', {
      language: 'plantuml',
      generator: null,
    }); // TODO: add generator

    this.className = className || this.defaultClassName;
  }

  isValidLanguage(lang) {
    let mapped = this.languages.get(lang);
    return !!mapped;
  }

  renderWrapped(language, input, pluginOptions = {}) {
    let svg = this.render(language, input, pluginOptions);

    let lang = this.languages.get(language);
    return `<div class="coc-${this.className}
      ${this.className}-${lang.language}">${svg.toEmbed()}</div>`;
  }

  render(language, input, pluginOptions = {}) {
    let lang = this.languages.get(language);

    if (!lang) {
      throw Error(`Unknown language ${language}`);
    }

    let langOptions = pluginOptions[lang] || {};
    return lang.generator.generate(lang.language, input, langOptions);
  }

  get defaultClassName() {
    return 'remark-draw';
  }
};
