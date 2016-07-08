import { bindActionCreators } from 'redux';
import * as CounterActions from './counter';

export function bindActions (dispatch) {
  return {
    counter: bindActionCreators(CounterActions, dispatch)
  };
}
