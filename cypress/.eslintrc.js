module.exports = {
  root: true,
  plugins: ['eslint-plugin-cypress'],
  extends: ['../.eslintrc.js', 'plugin:cypress/recommended'],
  env: { 'cypress/globals': true },
};
