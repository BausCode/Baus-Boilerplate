import React from 'react';
import { IndexLink, Link } from 'react-router';

function Nav () {
  return (
    <nav className='header--main-nav'>
      <ul className='nav-list'>
        <li className='nav-list-item'>
          <IndexLink to={'/'} className='nav-item-link' activeClassName='active'>Home</IndexLink>
        </li>
        <li className='nav-list-item'>
          <Link to={'/counter'} className='nav-item-link' activeClassName='active'>Counter</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
