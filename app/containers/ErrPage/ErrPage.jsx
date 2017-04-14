import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { windowHeight } from 'services/windowSize';
import Title from 'components/Title';

function ErrPage (props) {
  return (
    <div className='container' style={{minHeight: windowHeight(768, -275, 150), padding: '75px 10px'}}>
      <Title type='large'>{ props.err.get('status', '404') } - { props.err.get('message', 'Page could not be found') }</Title>
    </div>
  );
}

ErrPage.propTypes = {
  err: PropTypes.object.isRequired
};

export default connect(
  function mapStateToProps(state) {
    return {
      err: state.err,
    };
  },
)(ErrPage);
