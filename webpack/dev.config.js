'use strict';

var webpack = require ('webpack');
var WebpackErrorNotificationPlugin = require('webpack-error-notification');
var path = require('path');

var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, '../public/dist');
var APP_PATH = path.resolve(ROOT_PATH, '../app/app.js');
var host = process.env.HOST || "0.0.0.0";
var port = (process.env.PORT + 1) || 3001;

var config = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    APP_PATH
  ],
  output: {
    path: BUILD_PATH,
    publicPath: 'http://' + host + ':' + port + '/dist/',
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.js?$|\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        //loaders: ["style", "css", "autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true"]
        loaders: ["style", "css", "sass"]
      },
      { 
        test: /\.(jpe?g|png|gif|svg)$/, 
        loader: "file" 
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        BROWSER: JSON.stringify(true)
      }
    }),
    new WebpackErrorNotificationPlugin()
  ]
};

module.exports = config;
