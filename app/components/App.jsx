import React from 'react';
import Title from './Title.jsx';
import Nav from './Nav.jsx';

class App extends React.Component {
  render () {
    return (
      <main>
        <header className="header">
          <Title />
          <Nav />
        </header>
        { this.props.children }
      </main>
    );
  }
};

export default App;
