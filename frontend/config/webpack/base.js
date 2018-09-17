const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { resolveFromRootPath } = require('../helpers');

module.exports = {
  context: resolveFromRootPath('src'),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    app: ['./index.jsx'],
    vendor: [
      'babel-polyfill',
      '@material-ui/core',
      'prop-types',
      'react',
      'react-dom',
      'react-emotion',
      'react-router-dom',
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      hash: true,
    }),
    new CleanWebpackPlugin(resolveFromRootPath('dist'), {
      allowExternal: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_ENV: JSON.stringify(process.env.API_ENV),
        BASE_API_URL: JSON.stringify(process.env.BASE_API_URL),
      },
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },
};