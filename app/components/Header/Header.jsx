import React from 'react';
import { Link } from 'react-router';
import Nav from 'components/Nav';

if (process.env.BROWSER) {
  require('./style.scss');
}

function Header () {
  return (
    <header className='header--main'>
      <h1><Link to='/'>BausCode</Link></h1>
      <Nav />
    </header>
  );
}

export default Header;
