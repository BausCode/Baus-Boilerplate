import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { Map } from 'immutable';
import configureStore from './store/configureStore';

if (process.env.BROWSER) {
  require('./stylesheets/base.scss');
}

console.log('%c App Started', 'color:green');

const initialState = window.__initial_state__;
const store = configureStore({
  counter: Map( initialState.counter )
});

render(
  <Provider store={store}>
    <Router history={browserHistory}>
    {routes}
    </Router>
  </Provider>, 
  document.getElementById('root')
);
