import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

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
  counter: ImmutablePropTypes.map.isRequired
};

export default connect(
  function mapStateToProps(state) {
    return {
      counter: state.counter,
    };
  }
)(Counter);
