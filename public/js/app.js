import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';
import '../css/app/app.scss';

console.log('%c App Started', 'color:green');

let history = createBrowserHistory();
let el = document.getElementById('app');

render(<Router history={history}>{routes}</Router>, el);
