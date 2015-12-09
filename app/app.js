import React from 'react';
import globalStyles from './stylesheets/defaults/base-global.scss';
import typography from './stylesheets/defaults/typography.scss';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';

console.log('%c App Started', 'color:green');

let history = createBrowserHistory();
let element = document.getElementById('app');

render(<Router history={history}>{routes}</Router>, element);
