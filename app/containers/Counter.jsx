import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter.jsx';
import * as CounterActions from '../actions/counter';

function mapStateToProps(state) {
  console.log('map state', state);
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  console.log('map dispatch', dispatch);
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
