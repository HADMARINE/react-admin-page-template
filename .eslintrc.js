module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    // 'prettier/@typescript-eslint',
    'plugin:jest/recommended',
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 7,
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
  },
  plugins: ['babel', '@typescript-eslint', 'jest'],
  rules: {
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    'no-use-before-define': 'off',
    camelcase: 'error',
    complexity: 'off',
    'constructor-super': 'error',
    'dot-notation': 'error',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'id-blacklist': [
      'error',
      'any',
      'Number',
      'number',
      'String',
      'string',
      'Boolean',
      'boolean',
      'Undefined',
      'undefined',
    ],
    'id-match': 'error',
    'max-classes-per-file': ['error', 1],
    'max-len': [
      'warn',
      {
        code: 120,
      },
    ],
    'new-parens': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-cond-assign': 'error',
    'no-console': [
      'warn',
      {
        allow: [
          'warn',
          'dir',
          'timeLog',
          'assert',
          'clear',
          'count',
          'countReset',
          'group',
          'groupEnd',
          'table',
          'dirxml',
          'error',
          'groupCollapsed',
          'Console',
          'profile',
          'profileEnd',
          'timeStamp',
          'context',
        ],
      },
    ],
    'no-debugger': 'error',
    'no-empty': 'error',
    'no-eval': 'error',
    'no-fallthrough': 'off',
    'no-invalid-this': 'off',
    'no-multiple-empty-lines': 'off',
    'no-new-wrappers': 'error',
    'no-shadow': [
      'error',
      {
        hoist: 'all',
      },
    ],
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'warn',
    'no-undef-init': 'warn',
    'no-underscore-dangle': 'off',
    'no-unsafe-finally': 'warn',
    'no-unused-expressions': 'warn',
    'no-unused-labels': 'warn',
    'object-shorthand': 'warn',
    'no-unused-vars': 'off',
    'one-var': ['error', 'never'],
    '@typescript-eslint/isolatedModules': 'off',
    radix: 'error',
    'spaced-comment': 'error',
    'use-isnan': 'error',
    'valid-typeof': 'off',
  },
};
