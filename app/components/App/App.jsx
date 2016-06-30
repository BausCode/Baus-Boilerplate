import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActions } from '../../actions';
import Header from '../Header';

if (process.env.BROWSER) {
  require('../../stylesheets/defaults/content.scss');
}

function App (props) {
  return (
    <main>
      <Header />
      <div className='content'>
        { props.children }
      </div>
    </main>
  );
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  state: PropTypes.object.isRequired
};

export default connect(
  function mapStateToProps(state) { return { state }; },
  function mapDispatchToProps(dispatch) { return { actions: bindActions(dispatch) }; }
)(App);
