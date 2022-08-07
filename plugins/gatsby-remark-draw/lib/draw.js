'use strict';

module.exports = class Draw {
  constructor(className) {
    const skyrta = require('skyrta');

    this.languages = {
      'bob-svg': { language: 'bob', generator: skyrta },
      'dot-svg': { language: 'dot', generator: skyrta },
      'mermaid-svg': { language: 'mermaid', generator: skyrta },
      'plantuml-svg': { language: 'plantuml', generator: null } // TODO: add generator
    };

    this.className = className || this.defaultClassName;
  }

  isValidLanguage(lang) {
    const mapped = this.languages[lang];
    return !!mapped;
  }

  renderWrapped(language, input, pluginOptions = {}) {
    const svg = this.render(language, input, pluginOptions);

    const lang = this.languages[language];
    return `<div class="coc-${this.className}
      ${this.className}-${lang.language}">${svg.toEmbed()}</div>`;
  }

  render(language, input, pluginOptions = {}) {
    const lang = this.languages[language];

    if (!lang) {
      throw Error(`Unknown language ${language}`);
    }

    const langOptions = pluginOptions[lang] || {};
    return lang.generator.generate(lang.language, input, langOptions);
  }

  get defaultClassName() {
    return 'remark-draw';
  }
};
