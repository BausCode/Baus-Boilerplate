import React from 'react';
import { IndexLink, Link } from 'react-router';

class Nav extends React.Component {
  render() {
    return (
      <nav className='header--main-nav'>
        <ul className='nav-list'>
          <li className='nav-list-item'>
            <IndexLink to={'/'} className='nav-item-link' activeClassName='active'>Dashboard</IndexLink>
          </li>
          <li className='nav-list-item'>
            <Link to={'/page2'} className='nav-item-link' activeClassName='active'>Settings</Link>
          </li>
        </ul>
      </nav>
    );
  }
};

export default Nav;
