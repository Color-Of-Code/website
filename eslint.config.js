import babelParser from '@babel/eslint-parser';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import js from '@eslint/js';

// Create config objects for React and JSX-a11y recommended settings
const reactRecommendedConfig = {
  plugins: {
    react: reactPlugin
  },
  rules: {
    ...reactPlugin.configs.recommended.rules
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};

const jsxA11yRecommendedConfig = {
  plugins: {
    'jsx-a11y': jsxA11yPlugin
  },
  rules: {
    ...jsxA11yPlugin.configs.recommended.rules
  }
};

export default [
  // ESLint recommended rules
  js.configs.recommended,

  // React and JSX-a11y recommended rules
  reactRecommendedConfig,
  jsxA11yRecommendedConfig,

  // Global settings and parser options
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      }
    },
    // Rules for all files
    rules: {
      'strict': 0,
      'no-console': 'warn',
      'quotes': ['warn', 'single'],
      'prettier/prettier': 'warn',
      'react/jsx-no-literals': 0
    },
    // Plugin configurations
    plugins: {
      'react': reactPlugin,
      'prettier': prettierPlugin,
      'jsx-a11y': jsxA11yPlugin
    }
  },

  // File-specific configurations
  {
    files: ['src/**/*.js', 'plugins/**/*.js'],
    ignores: ['node_modules/**', 'public/**', '.cache/**']
  }
];
