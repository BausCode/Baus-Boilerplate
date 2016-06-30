import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CounterActions from '../../actions/counter';

class Counter extends Component {
  render () {
    const { increment, decrement, counter } = this.props;

    return (
      <div className="counter">
        <h1>{counter}</h1>
        <button onClick={increment}>Increase</button>
        <button onClick={decrement}>Decrease</button>
      </div>
    );
  }
}

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
};

export default connect(
  function mapStateToProps(state) { return { counter: state.counter }; },
  function mapDispatchToProps(dispatch) { return bindActionCreators(CounterActions, dispatch); }
)(Counter);
