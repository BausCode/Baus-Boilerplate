'use strict';

import path from 'path';
import express from 'express';
import exphbs from 'express-handlebars';
import React from 'React';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import routes from './app/routes';

const isDev = process.env.NODE_ENV !== 'production';
const port = isDev ? 3000: process.env.PORT;
const publicPath = path.resolve(__dirname, 'public');
const app = express();

const hbs = exphbs.create({
  layoutsDir: 'views/_layouts',
  defaultLayout: 'default',
  extname: '.hbs'
});

app.engine('.hbs', hbs.engine); 
app.set('views', 'views/_pages');
app.set('view engine', '.hbs');

if (isDev) {
  let config = require('./webpack.config');
  let webpack = require('webpack');
  let webpackMiddleware = require('webpack-dev-middleware');
  let webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
}
else {
  app.use(express.static(publicPath));
}

app.get('*', function response(req, res) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    }
    else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }
    else if (renderProps) {
      let html = renderToString(<RoutingContext {...renderProps} />);
      res.status(200).render('main', {content: html});
    }
    else {
      res.status(404).render('404');
    }
  });
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('Running on port %s', port);
});
