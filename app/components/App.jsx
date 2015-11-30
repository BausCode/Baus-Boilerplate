import React from 'react';
import Title from './Title';
import Nav from './Nav';

class App extends React.Component {
  render () {
    return (
      <main>
        <header>
          <Title />
          <Nav />
        </header>
        { this.props.children }
      </main>
    );
  }
};

export default App;
