import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Header from 'components/Header';
import Footer from 'components/Footer';
//import GA from 'services/gaService';

if (process.env.BROWSER) {
  require('./style.scss');
}

function renderChildren(props) {
  return React.Children.map(props.children, child => {
    return React.cloneElement(child, {
      actions: props.actions,
      children: props.children,
      location: props.location,
      router: props.router
    });
  });
}

function renderDevTools () {
  if (process.env.NODE_ENV === 'development') {
    const DevTools = require('../../components/DevTools').default;
    return <DevTools />;
  }
  return null;
}


class MainWrapper extends Component {
  componentDidMount() {
    //Uncomment to enable Google Analytics Page Tracking
    //GA.pageload(this.props.location.pathname);
  }

  componentWillReceiveProps(nextProps) {
    if (process.env.BROWSER && this.props.location.pathname !== nextProps.location.pathname) {
      window.scrollTo(0, 0);
      //Uncomment to enable Google Analytics Page Tracking
      //GA.pageload(nextProps.location.pathname);
    }
  }

  render () {
    return (
      <div>
        <Header location={ this.props.location } />
        <main
          role="main"
          aria-live='polite'
          aria-relevant='additions removals'
          className='clearfix'>
          { renderChildren(this.props) }
        </main>
        <Footer role="contentinfo" />
        { renderDevTools() }
      </div>
    );
  }
}

MainWrapper.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

export default withRouter(MainWrapper);
