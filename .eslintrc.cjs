module.exports = {
  root: true,
  env: {
    node: true
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  extends: [
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
    'eslint:recommended',
    '@vue/typescript',
    '@vue/prettier',
    '@feature-sliced',
  ],
  rules: {
    'no-debugger': 'warn',
    'no-console': 'warn',
    'linebreak-style': 'off',
    'arrow-parens': 'off',
    'no-plusplus': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      ignoreRestSiblings: true
    }],
    camelcase: 'off',
    'no-return-await': 'off',
    'no-shadow': 'off',
    'no-loop-func': 'off',
    'no-restricted-exports': ['error', {
      restrictedNamedExports: []
    }],
    'no-use-before-define': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-useless-constructor': 'off',
    'no-empty-function': ['error', {
      allow: ['constructors']
    }],
    'vue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
    ],
    'vue/custom-event-name-casing': ['error', 'kebab-case'],
    'vue/no-v-model-argument': 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: false
    }
  }
};
