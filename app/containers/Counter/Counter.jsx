import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Counter (props) {
  const { increment, decrement } = props.actions.counter;

  return (
    <div className="counter">
      <p className="heading-1">{ props.counter.get('value', 0) }</p>
      <button onClick={ increment }>Increase</button>
      <button onClick={ decrement }>Decrease</button>
    </div>
  );
}

Counter.propTypes = {
  actions: PropTypes.object.isRequired,
  counter: PropTypes.object.isRequired
};

export default connect(
  function mapStateToProps(state) {
    return {
      counter: state.counter,
    };
  }
)(Counter);
