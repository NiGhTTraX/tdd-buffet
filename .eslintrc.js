module.exports = {
  'root': true,

  'extends': [
    '@nighttrax/eslint-config-tsx',
    'plugin:import/errors'
  ],

  'plugins': ['import'],

  'rules': {
    'import/no-extraneous-dependencies': 'error'
  },

  'settings': {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      // use <root>/tsconfig.json
      'typescript': {},
    }
  },

  'overrides': [{
    files: ['**/*.spec.{ts,tsx}'],
    rules: {
      // TODO: figure out how to lint these files for extra dev deps
      'import/no-extraneous-dependencies': 'off'
    }
  }]
};
