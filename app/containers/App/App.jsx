import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActions } from 'actions';
import MainWrapper from 'containers/MainWrapper';

function App (props) {
  return (
    <MainWrapper
      actions={ props.actions }
      children={ props.children }
      location={ props.location }
      state={ props.state } />
  );
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

export default connect(
  function mapStateToProps(state) { return { state }; },
  function mapDispatchToProps(dispatch) { return { actions: bindActions(dispatch) }; }
)(App);
