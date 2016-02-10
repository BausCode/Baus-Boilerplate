import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import Home from './components/Home/Index.jsx';
import Counter from './components/Counter/Index.jsx';
import NoMatch from './components/NoMatch.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/index.html" component={Home} />
    <Route path="/counter" component={Counter} />
    <Route path="/*" component={NoMatch} />
  </Route>
);
