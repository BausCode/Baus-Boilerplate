'use strict';

import webpack from 'webpack';
import  path from 'path';

const ROOT_PATH = path.resolve(__dirname);
const BUILD_PATH = path.resolve(ROOT_PATH, 'public');
const APP_PATH = path.resolve(ROOT_PATH, 'app', 'app.js');

var configs = {
  devtool: 'source-map',
  entry: APP_PATH,
  output: {
    path: BUILD_PATH,
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        loader: 'babel',
        exclude: /node_modules/ 
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  }
};

module.exports = configs;
