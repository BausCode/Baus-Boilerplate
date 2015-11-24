'use strict';

import path from 'path';
import express from 'express';
import exphbs from 'express-handlebars';
import React from 'React';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import routes from './public/js/routes';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';

const isDev = process.env.NODE_ENV !== 'production';
const port = isDev ? 3000: process.env.PORT;
const publicPath = path.resolve(__dirname, 'dist');
const app = express();

var hbs = exphbs.create({
  layoutsDir: 'views/_layouts',
  defaultLayout: 'default',
  extname: '.hbs'
});

app.engine('.hbs', hbs.engine); 
app.set('views', 'views/_pages');
app.set('view engine', '.hbs');

if (isDev) {
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

  app.get('*', function response(req, res) {
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        let html = renderToString(<RoutingContext {...renderProps} />);

        res.status(200).render('main', {content: html});

      } else {
        res.status(404).render('404');
      }
    });
    //res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    //res.render('main').end();
  });
}
else {
  app.use(express.static(publicPath));

  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, 'localhost', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
