module.exports = {
  extends: ['eslint:recommended', 'react-app', 'prettier'],
  rules: {
    'arrow-body-style': ['warn', 'as-needed'],
    'consistent-return': 'warn',
    'import/newline-after-import': 'error',
    'import/order': ['error', { groups: [['builtin', 'external', 'internal']] }],
    'import/prefer-default-export': 0,
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-duplicate-imports': 'warn',
    'no-unsafe-optional-chaining': 0,
    'no-var': 'warn',
    'object-shorthand': 'warn',
    'prefer-arrow-callback': 'warn',
    'prefer-const': 'warn',
    'prefer-spread': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/default-props-match-prop-types': 'warn',
    'react/no-unused-prop-types': 'warn',
    'react/prefer-stateless-function': 'warn',
    'react/prop-types': 0,
    'react/require-default-props': 0,
  },
  plugins: ['prettier', 'react-hooks'],
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
};
