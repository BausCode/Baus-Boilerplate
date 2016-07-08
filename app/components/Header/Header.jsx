import React from 'react';
import Nav from '../Nav';

if (process.env.BROWSER) {
  require('../../stylesheets/modules/Header.scss');
}

function Header () {
  return (
    <header className='header--main'>
      <h1>BausCode</h1>
      <Nav />
    </header>
  );
}

export default Header;
