import { combineReducers } from 'redux';
import counter, { initialState as counterInitialState } from './counter';
import err, { initialState as errInitialState } from './err';

const reducers = {
  counter,
  err
};

export const initialState = {
  counter: counterInitialState,
  err: errInitialState
};

export default combineReducers(reducers);
