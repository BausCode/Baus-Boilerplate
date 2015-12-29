'use strict';

var webpack = require('webpack');
var WebpackErrorNotificationPlugin = require('webpack-error-notification');
var babelrc = require('./hmr.config'); 
var path = require('path');

var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, '../public/dist');
var APP_PATH = path.resolve(ROOT_PATH, '../app');
var host = process.env.HOST || "0.0.0.0";
var port = process.env.PORT || 3000;


var config = {
  devtool: 'eval-source-map',
  context: __dirname + '../app',
  entry: {
    app: [
      'eventsource-polyfill', // necessary for hot reloading with IE
      'webpack-hot-middleware/client?reload=true',
      APP_PATH + '/app.js'
    ]
  },
  output: {
    path: BUILD_PATH,
    publicPath: 'http://' + host + ':' + port + '/dist/',
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
        loaders: ['babel?' + JSON.stringify(babelrc), 'eslint'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'autoprefixer?browsers=last 2 version', 'sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true']
      },
      { 
        test: /\.(jpe?g|png|gif|svg)$/, 
        loader: "file" 
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        BROWSER: JSON.stringify(true)
      }
    }),
    new WebpackErrorNotificationPlugin()
  ]
};

module.exports = config;
