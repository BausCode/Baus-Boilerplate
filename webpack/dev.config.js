'use strict';

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var WebpackErrorNotificationPlugin = require('webpack-error-notification');
var ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
var hmrConfig = require('./hmr.config'); 
var modernizrConfig = require('./modernizr.config');
var path = require('path');

var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, '../public/dist');
var APP_PATH = path.resolve(ROOT_PATH, '../app');
var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 8080;

var config = {
  context: APP_PATH,
  devtool: 'eval-source-map',
  entry: {
    app: [
      'babel-polyfill', // from YOU IE crashing fix
      'eventsource-polyfill', // necessary for hot reloading with IE
      'webpack-hot-middleware/client',
      APP_PATH + '/app.js'
    ]
  },
  output: {
    path: BUILD_PATH,
    publicPath: '/dist/',
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    root: APP_PATH
  },
  module: {
    loaders: [
      {
        test: /\.js?$|\.jsx?$/,
        loaders: ['react-hot', 'babel?' + JSON.stringify(hmrConfig), 'eslint'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true']
      },
      { 
        test: /\.(jpg|jpeg|png|gif|svg)$/, 
        loaders: ['url?limit=25000', 'img']
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)$/, 
        loader: 'url?limit=20000'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new ModernizrWebpackPlugin(modernizrConfig),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new WebpackErrorNotificationPlugin()
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions', 'iOS < 9']
    })
  ]
};

module.exports = config;
