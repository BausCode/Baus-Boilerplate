import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';
import configureStore from './store/configureStore';

if (process.env.BROWSER) {
  require('./stylesheets/defaults/base-global.scss');
  require('./stylesheets/defaults/typography.scss');
}

console.log('%c App Started', 'color:green');

const store = configureStore();
const history = createBrowserHistory();

render(
  <Provider store={store}>
    <Router history={history}>
    {routes}
    </Router>
  </Provider>, 
  document.getElementById('root')
);
