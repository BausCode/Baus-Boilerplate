import React from 'react';
import { IndexLink, Link } from 'react-router';

if (process.env.BROWSER) {
  require('./style.scss');
}

function Nav () {
  return (
    <nav className='main-nav'>
      <h1 className='visuallyhidden'>Navigation</h1>
      <ul className='main-nav__list'>
        <li className='main-nav__list-item'>
          <IndexLink to={'/'} className='main-nav__item-link' activeClassName='active'>Home</IndexLink>
        </li>
        <li className='main-nav__list-item'>
          <Link to={'/counter'} className='main-nav__item-link' activeClassName='active'>Counter</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
