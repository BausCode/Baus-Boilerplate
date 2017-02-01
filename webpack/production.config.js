'use strict';

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
var modernizrConfig = require('./modernizr.config');
var path = require('path');

var BUILD_PATH = path.resolve(__dirname, '../public/dist');
var APP_PATH = path.resolve(__dirname, '../app');

var sassLoaders = [
  'css',
  'postcss',
  'sass?outputStyle=compressed&includePaths[]=' + path.resolve(__dirname, '../app')
];

var configs = {
  entry: [
    'babel-polyfill',
    APP_PATH + '/app.js'
  ],
  output: {
    path: BUILD_PATH,
    filename: "app.js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        loaders: ['babel', 'eslint', 'webpack-strip-logs'],
        exclude: /node_modules/ 
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
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
        NODE_ENV: JSON.stringify('production')
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
