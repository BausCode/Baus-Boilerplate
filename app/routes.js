import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App';
import Home from 'containers/Home';
import Counter from 'containers/Counter';

if (typeof module !== 'undefined' && module.require) {
  if (typeof require.ensure === 'undefined') {
    require.ensure = require('node-ensure'); // shim for node.js
  }
}

export function getRoutes () {
  return (
    <Route path="/" component={ App }>
      <IndexRoute component={ Home } />
      <Route path="/counter" component={ Counter } />
      <Route path="/*" getComponent={ getErrPage } />
    </Route>
  );
}

function getErrPage (nextState, cb) {
  const ErrPage = require('./containers/ErrPage').default;
  if (process.env.BROWSER) {
    cb(null, props => <ErrPage {...props} />);
  }
  else {
    // Trigger 404 on server
    cb({status: 404}, props => <ErrPage {...props} />);
  }
}
