'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
var modernizrConfig = require('./modernizr.config');
var path = require('path');

var BUILD_PATH = path.resolve(__dirname, '../public/dist');
var APP_PATH = path.resolve(__dirname, '../app');

var sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?outputStyle=compressed&includePaths[]=' + path.resolve(__dirname, '../app')
];

var configs = {
  entry: {
    app: [
      'babel-polyfill',
      APP_PATH + '/app.js'
    ],
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'redux-thunk', 'react-router', 'immutable' ]
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        loaders: ['babel-loader', 'eslint-loader', 'webpack-strip-logs'],
        exclude: /node_modules/ 
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: sassLoaders.join('!')})
      },
      { 
        test: /\.(jpg|jpeg|png|gif|svg)$/, 
        loaders: ['url-loader?limit=25000', 'img-loader']
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)$/, 
        loader: 'url-loader?limit=20000'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('app.css'),
    new ModernizrWebpackPlugin(modernizrConfig),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    })
  ]
};

module.exports = configs;
