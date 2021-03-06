import { Map } from 'immutable';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from 'actions/counter';

export const initialState = Map({
  value: 5
});

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state.update('value', function increment (value) {
        return value + 1;
      });
    case DECREMENT_COUNTER:
      return state.update('value', function decrement (value) {
        return value - 1;
      });
    default:
      return state;
  }
}
