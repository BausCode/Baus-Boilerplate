import path from 'path';
import express from 'express';
import handlebars from 'express-handlebars';
import React from 'React';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import routes from '../app/routes';

const isDev = process.env.NODE_ENV !== 'production';
const env  = isDev ? 'development' : process.env.NODE_ENV;
const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

const publicPath = path.resolve(__dirname, '../public');
const templatePath = path.resolve(__dirname, '../app/templates');
const hbs = handlebars.create({
  layoutsDir: templatePath + '/_layouts',
  defaultLayout: 'default',
  helpers: new require( templatePath + '/_helpers')(),
  extname: '.hbs'
});

module.exports = {
  start: function() {
    let server = express();

    server.set("env", env);
    server.set("host", host); 
    server.set("port", port);

    server.engine('.hbs', hbs.engine); 
    server.set('views', templatePath + '/_pages');
    server.set('view engine', '.hbs');

    if (isDev) {
      let config = require('../webpack/dev.config');
      let webpack = require('webpack');
      let webpackMiddleware = require('webpack-dev-middleware');
      let webpackHotMiddleware = require('webpack-hot-middleware');

      const compiler = webpack(config);
      const middleware = webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        contentBase: `http://${host}:${port+1}`,
        headers: { "Access-Control-Allow-Origin": "*" },
        stats: {
          colors: true,
          hash: false,
          timings: true,
          chunks: false,
          chunkModules: false,
          modules: false
        }
      });

      server.use(middleware);
      server.use(webpackHotMiddleware(compiler));
    }

    server.use(express.static(publicPath));

    server.get('*', function response(req, res) {
      match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
          res.status(500).send(error.message);
        }
        else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        }
        else if (renderProps && !isDev) {
          let html = renderToString(<RoutingContext {...renderProps} />);
          res.status(200).render('main', {env: env, content: html});
        }
        else if (renderProps && isDev) {
          res.status(200).render('main', {env: env});
        }
        else {
          res.status(404).render('404');
        }
      });
    });

    server.listen(port, host, function onStart(err) {
      if (err) {
        console.log(err);
      }
      else {
         console.log('  /$$$$$$$    /$$$$$$   /$$   /$$   /$$$$$$ ');
         console.log(' | $$__  $$  /$$__  $$ | $$  | $$  /$$__  $$');
         console.log(' | $$  \\ $$ | $$  \\ $$ | $$  | $$ | $$  \\__/');
         console.log(' | $$$$$$$  | $$$$$$$$ | $$  | $$ |  $$$$$$ ');
         console.log(' | $$__  $$ | $$__  $$ | $$  | $$  \\____  $$');
         console.log(' | $$  \\ $$ | $$  | $$ | $$  | $$  /$$  \\ $$');
         console.log(' | $$$$$$$/ | $$  | $$ |  $$$$$$/|   $$$$$$/');
         console.log(' |_______/  |__/  |__/  \\______/   \\______/ ');
      }
      console.info('\n=> Server is running %s on %s:%s\n', env, host, port);
    });
  }
}
