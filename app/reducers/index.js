import { combineReducers } from 'redux';
import counter, { initialState as counterInitialState } from './counter';

const reducers = {
  counter
};

export const initialState = {
  counter: counterInitialState
};

export default combineReducers(reducers);
