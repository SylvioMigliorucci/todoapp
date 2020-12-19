module.exports = {
  env: {
    es2020: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    // eslint-disable-next-line no-dupe-keys,
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    endOfLine: 'auto',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};
