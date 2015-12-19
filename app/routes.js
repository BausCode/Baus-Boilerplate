import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Counter from './components/Counter';
import NoMatch from './components/NoMatch';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/index.html" component={Home} />
    <Route path="/counter" component={Counter} />
    <Route path="/*" component={NoMatch} />
  </Route>
);
