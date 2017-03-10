import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { getRoutes } from './routes';
import { Map } from 'immutable';
import configureStore from 'store/configureStore';

if (process.env.BROWSER) {
  require('styles/base.scss');
}

console.log('%c App Started', 'color:green');

if (process.env.NODE_ENV === 'development') {
  console.log('%c Redux Dev Tools:\n Toggle View "ctrl+h"\n Toggle Position "ctrl+m"', 'color:blue');
}

const initialState = window.__initial_state__;
const store = configureStore({
  counter: Map( initialState.counter )
});

render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
    { getRoutes() }
    </Router>
  </Provider>, 
  document.getElementById('root')
);
