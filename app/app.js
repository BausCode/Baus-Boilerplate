import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';

if (process.env.BROWSER) {
  require('./stylesheets/defaults/base-global.scss');
  require('./stylesheets/defaults/typography.scss');
}

console.log('%c App Started', 'color:green');

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
    {routes}
    </Router>
  </Provider>, 
  document.getElementById('root')
);
