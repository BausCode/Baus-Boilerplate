import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import { get as _get } from 'lodash';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import configureStore from '../app/store/configureStore';
import { initialState as initialAppState } from '../app/reducers';
import { getRoutes } from '../app/routes';
import render from './render';

const isDev = process.env.NODE_ENV !== 'production';
const env  = isDev ? 'development' : process.env.NODE_ENV;
const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

const publicPath = path.resolve(__dirname, '../public');

module.exports = {
  start: function() {
    let server = express();

    server.set('env', env);
    server.set('host', host); 
    server.set('port', port);

    if (isDev) {
      require('./dev.server.js')(server);
    }
    else {
      server.use(compression());
      server.use(helmet());
    }

    server.use(express.static(publicPath));

    server.get('*', function response(req, res) {
      // Force TLS/SSL
      //if ( process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] != 'https') {
        //return res.redirect(301, reqFullUrl);
      //}
      matchRoute(req, res, initialAppState);
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

function matchRoute (req, res, initialAppState) {
  const store = configureStore( initialAppState );
  const initialState = store.getState();
  const routes = getRoutes(store);

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      const status = _get(error, 'status', 500);
      const message = status === 404 ? 'Page could not be found.' : _get(error, 'message', 'An unknown error occurred.');
      const html = render(React)(store, renderProps, {status, message});

      if (req.accepts('html')) {
        res.status(status).send(html);
      }
      else {
        res.status(status).send(message);
      }
    }
    else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }
    else {
      const html = render(React)(store, renderProps);
      res.status(200).send(html);
    }
  });
}
