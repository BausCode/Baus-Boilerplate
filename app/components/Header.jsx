import React from 'react';
import Nav from './Nav.jsx';

if (process.env.BROWSER) {
  require('../stylesheets/modules/Header.scss');
}

let Title = function () {
  return (
    <header className='header--main'>
      <h1>BausCode</h1>
      <Nav />
    </header>
  );
};

export default Title;
