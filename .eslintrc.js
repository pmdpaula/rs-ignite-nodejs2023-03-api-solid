/* eslint-disable no-undef */
module.exports = {
  'env': {
    'node': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  'overrides': [
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    // 'ecmaFeatures': {
    //   'jsx': true,
    // }
  },
  'plugins': [
    // 'react',
    '@typescript-eslint',
    // 'module-resolver',
  ],
  'rules': {
    'indent': ['warn', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'double'],
    'semi': ['error', 'always'],
    'react/react-in-jsx-scope': 'off',

    'import/namespace': 0,
    'import/no-unresolved': [2, { ignore: ['^@'] }],
  },
  'settings': {
    'react': {
      'version': 'detect',
      'import/resolver:': {
        typescript: true,
        node: true
      },
      'babel-module': {}
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
  }
};
