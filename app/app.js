import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';

if (process.env.BROWSER) {
  require('./stylesheets/base.scss');
}

console.log('%c App Started', 'color:green');

const store = configureStore( window.__initial_state__ );

render(
  <Provider store={store}>
    <Router history={browserHistory}>
    {routes}
    </Router>
  </Provider>, 
  document.getElementById('root')
);
