module.exports = {
  parser: 'babel',
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'es5',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'typescript',
      },
    },
  ],
};
