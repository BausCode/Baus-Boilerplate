import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import App from './components/App.jsx';
import Index from './components/Index.jsx';
import Page2 from './components/Page2.jsx';
import NoMatch from './components/NoMatch.jsx';

import '../public/css/app/app.scss';

console.log('%c App Started', 'color:green');

render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App} />
    <Route path="page2" component={Page2} />
    <Route path="*" component={NoMatch}/>
  </Router>
), document.getElementById('main'));
