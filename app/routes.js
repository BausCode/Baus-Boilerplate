import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App.jsx';
import Home from './containers/Home.jsx';
import Counter from './containers/Counter.jsx';
import NoMatch from './containers/NoMatch.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/index.html" component={Home} />
    <Route path="/counter" component={Counter} />
    <Route path="/*" component={NoMatch} />
  </Route>
);
