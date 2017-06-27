'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

var BUILD_PATH = path.resolve(__dirname, '../public/dist/');
var APP_PATH = path.resolve(__dirname, '../app');

var sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?outputStyle=compressed&includePaths[]=' + APP_PATH
];

var configs = {
  context: APP_PATH,
  devtool: false,
  entry: {
    app: APP_PATH + '/index.js',
    vendor: ['babel-polyfill', 'react', 'react-dom', 'redux', 'react-redux', 'redux-thunk', 'react-router', 'immutable' ]
  },
  output: {
    path: BUILD_PATH,
    publicPath: '/dist/',
    filename: '[id].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  resolve: {
    modules: [APP_PATH, 'node_modules'],
    extensions: ['.js', '.jsx', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        loaders: ['babel-loader', 'webpack-strip-logs'],
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
    new ExtractTextPlugin('styles.[contenthash].css'),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['app', 'vendor', 'manifest'],
      minChunks: Infinity
    }),
    new WebpackMd5Hash(),
    new ManifestPlugin({ fileName: 'manifest.json' }),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest'
    })
  ]
};

module.exports = configs;
