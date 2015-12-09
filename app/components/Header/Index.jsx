import React from 'react';
import Nav from './Nav.jsx';

if (process.env.BROWSER) {
  require('../../stylesheets/modules/Header.scss');
}

class Title extends React.Component {
  render() {
    return (
      <header>
        <h1 className='heading-main'>GitBaus</h1>
        <Nav />
      </header>
    );
  }
};

export default Title;
