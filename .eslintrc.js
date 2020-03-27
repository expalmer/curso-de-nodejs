module.exports = {
  extends: ['airbnb-base', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    'no-console': 0,
    semi: [2, 'never'],
    'object-curly-spacing': [2, 'always'],
    'arrow-parens': [2, 'as-needed'],
    'no-underscore-dangle': [2, { allow: ['_id'] }],
    'linebreak-style': 0,
    camelcase: [0, { properties: 'never' }],
  },
  plugins: ['import', 'prettier'],
  env: {
    node: true,
  },
}
