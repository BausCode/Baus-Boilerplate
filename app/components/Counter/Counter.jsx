import React, { PropTypes } from 'react';

function Counter (props) {
  const { increment, decrement } = props.actions.counter;
  const counter = props.state.counter;

  return (
    <div className="counter">
      <h1>{counter}</h1>
      <button onClick={increment}>Increase</button>
      <button onClick={decrement}>Decrease</button>
    </div>
  );
}

Counter.propTypes = {
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

export default Counter;
