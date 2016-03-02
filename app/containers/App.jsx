import React, { Component, PropTypes } from 'react';
import Header from '../components/Header.jsx';

if (process.env.BROWSER) {
  require('../stylesheets/defaults/content.scss');
}

class App extends Component {
  render () {
    return (
      <main>
        <Header />
        <div className='content'>
          { this.props.children }
        </div>
      </main>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
