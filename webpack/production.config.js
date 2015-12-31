'use strict';

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
var modernizrConfig = require('./modernizr.config');
var path = require('path');

var BUILD_PATH = path.resolve(__dirname, '../public/dist');
var APP_PATH = path.resolve(__dirname, '../app/app.js');

var sassLoaders = [
  'css',
  'postcss',
  'sass?outputStyle=compressed&includePaths[]=' + path.resolve(__dirname, '../app')
];

var configs = {
  devtool: 'source-map',
  entry: APP_PATH,
  output: {
    path: BUILD_PATH,
    filename: "app.js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    root: APP_PATH
  },
  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        loaders: ['babel'],
        exclude: /node_modules/ 
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        BROWSER: JSON.stringify(true)
      }
    }),
    new ExtractTextPlugin('app.css'),
    new ModernizrWebpackPlugin(modernizrConfig),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ]
};

module.exports = configs;
