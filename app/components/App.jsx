import React from 'react';
import Header from './Header/Index';
import Sidebar from './Sidebar/Index';

if (process.env.BROWSER) {
  require('stylesheets/defaults/content.scss');
}

class App extends React.Component {
  render () {
    return (
      <main>
        <Header />
        <Sidebar />
        <div className='content'>
          { this.props.children }
        </div>
      </main>
    );
  }
};

export default App;
