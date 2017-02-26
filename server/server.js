import path from 'path';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../app/routes';
import render from './render';

const isDev = process.env.NODE_ENV !== 'production';
const env  = isDev ? 'development' : process.env.NODE_ENV;
const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

const publicPath = path.resolve(__dirname, '../public');

module.exports = {
  start: function() {
    let server = express();

    server.set("env", env);
    server.set("host", host); 
    server.set("port", port);

    if (isDev) {
      require('./dev.server.js')(server);
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
        else if (renderProps) {
          const html = render(React)(renderProps);
          res.status(200).send(html);
        }
        else {
          const html = render(React)(renderProps);
          res.status(404).send(html);
        }
      });
    });

    server.listen(port, host, function onStart(err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log('');
        console.log('  /$$$$$$$    /$$$$$$   /$$   /$$   /$$$$$$ ');
        console.log(' | $$__  $$  /$$__  $$ | $$  | $$  /$$__  $$');
        console.log(' | $$  \\ $$ | $$  \\ $$ | $$  | $$ | $$  \\__/');
        console.log(' | $$$$$$$  | $$$$$$$$ | $$  | $$ |  $$$$$$ ');
        console.log(' | $$__  $$ | $$__  $$ | $$  | $$  \\____  $$');
        console.log(' | $$  \\ $$ | $$  | $$ | $$  | $$  /$$  \\ $$');
        console.log(' | $$$$$$$/ | $$  | $$ |  $$$$$$/|   $$$$$$/');
        console.log(' |_______/  |__/  |__/  \\______/   \\______/ ');
      }
      console.info('\n=> Baus Server is running %s on %s:%s\n', env, host, port);
    });
  }
}
