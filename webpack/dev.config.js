'use strict';

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var WebpackErrorNotificationPlugin = require('webpack-error-notification');
var hmrConfig = require('./hmr.config'); 
var path = require('path');

var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(__dirname, '../public/dist');
var APP_PATH = path.resolve(__dirname, '../app');
var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 8080;

var config = {
  context: APP_PATH,
  devtool: 'eval-source-map',
  entry: {
    app: [
      'eventsource-polyfill', // necessary for hot reloading with IE
      'webpack-hot-middleware/client',
      APP_PATH + '/index.js'
    ],
    vendor: ['babel-polyfill', 'react', 'react-dom', 'redux', 'react-redux', 'redux-thunk', 'react-router', 'immutable' ]
  },
  output: {
    path: BUILD_PATH,
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  resolve: {
    modules: [APP_PATH, 'node_modules'],
    extensions: ['.js', '.jsx', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.js?$|\.jsx?$/,
        use: ['react-hot-loader', 'babel-loader?' + JSON.stringify(hmrConfig), 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          { loader: 'postcss-loader', options: { sourceMap: true } },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [ APP_PATH ],
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: true
            }
          }
        ]
      },
      { 
        test: /\.(jpg|jpeg|png|gif|svg)$/, 
        use: ['url-loader?limit=25000', 'img-loader']
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)$/, 
        use: 'url-loader?limit=20000'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development'),
        DEV_TOOL_POS: JSON.stringify(process.env.DEV_TOOL_POS || 'right'),
        DEV_TOOL_VISIBLE: process.env.DEV_TOOL_VISIBLE || false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new WebpackErrorNotificationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['app', 'vendor']
    })
  ]
};

module.exports = config;
