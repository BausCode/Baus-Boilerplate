import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App';
import Home from 'containers/Home';
import Counter from 'containers/Counter';
import NoMatch from 'containers/NoMatch';

export function getRoutes () {
  return (
    <Route path="/" component={ App }>
      <IndexRoute component={ Home } />
      <Route path="/counter" component={ Counter } />
      <Route path="/*" component={ NoMatch } />
    </Route>
  );
}
