// eslint-disable-next-line
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');

module.exports = function override(config) {
  const { rules } = config.module;
  /*
    For prod builds we don't generate source maps which causes the
    react-scripts to exclude a rule in the build process so we have
    to check that here.
  */
  const loaders = rules[rules.length > 1 ? 1 : 0].oneOf;

  /*
    This fix is specifically for the frontlib-gui importing
    abort-controller/polyfill during initialization. We should really
    only be requiring that in browsers that need it but for now this
    is the solution. TODO: Remove once that is fixed.
  */
  loaders.splice(0, 0, {
    test: /\.mjs/,
    resolve: {
      fullySpecified: false,
    },
  });

  // needed to override CRA's module scope plugin
  // which would disable linking
  config.resolve.plugins = [];

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ];

  // Webpack no longer polyfills Node standard packages
  // needed for the Provenance wallet lib
  config.resolve.fallback = {
    ...config.resolve.fallback,
    buffer: require.resolve('buffer/'),
    crypto: require.resolve('crypto-browserify/'),
    stream: require.resolve('stream-browserify/'),
    util: false,
  };

  return config;
};
