'use strict';

var Webpack = require('webpack');
var path = require('path');
var nodeModulePath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'main.js');

var configs = {
  devtool: 'source-map',
  entry: mainPath,
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [nodeModulePath]
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  }
};

module.exports = configs;
