import React, { Component, PropTypes } from 'react';
import Header from './Header/Index';

if (process.env.BROWSER) {
  require('stylesheets/defaults/content.scss');
}

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

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
};

export default App;
