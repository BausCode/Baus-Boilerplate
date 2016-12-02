import React, { Component, PropTypes } from 'react';
import Header from '../Header';
import Footer from '../Footer';
//import GA from '../../services/gaService';

if (process.env.BROWSER) {
  require('./style.scss');
}

function renderChildren(props) {
  return React.Children.map(props.children, child => {
    return React.cloneElement(child, {
      actions: props.actions,
      children: props.children,
      history: props.history,
      location: props.location
    });
  });
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
      </div>
    );
  }
}

MainWrapper.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

export default MainWrapper;
