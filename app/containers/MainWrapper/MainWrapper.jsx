import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import DevTools from 'components/DevTools';
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
  if (process.env.NODE_ENV !== 'production') {
    return <DevTools />;
  }
  return null;
}


class MainWrapper extends Component {
  componentDidMount() {
    // Uncomment to inable Google Analytics Page Tracking
    //GA.pageload(this.props.location.pathname);
  }

  componentWillReceiveProps(nextProps) {
    if (process.env.BROWSER && this.props.location.pathname !== nextProps.location.pathname) {
      window.scrollTo(0, 0);
      // Uncomment to inable Google Analytics Page Tracking
      //GA.pageload(nextProps.location.pathname);
    }
  }

  render () {
    return (
      <div>
        <Header location={ this.props.location } />
        <main role="main">
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
