import React from 'react';
import Header from './Header/Index';

class App extends React.Component {
  render () {
    return (
      <main>
        <Header />
        { this.props.children }
      </main>
    );
  }
};

export default App;
