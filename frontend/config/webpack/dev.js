const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./base');
const { resolveFromRootPath } = require('../helpers');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: resolveFromRootPath('dist'),
    filename: './js/[name].js',
  },
  devServer: {
    contentBase: resolveFromRootPath('dist'),
    inline: true,
    host: 'localhost',
    port: 8080,
    stats: 'minimal',
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
