import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'pages/App';
import Main from 'pages/Main';
import Counter from 'pages/Counter';
import NoMatch from 'pages/NoMatch';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="/counter" component={Counter} />
    <Route path="/*" component={NoMatch} />
  </Route>
);
