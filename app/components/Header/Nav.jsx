import React from 'react';
import { IndexLink, Link } from 'react-router';

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <ul className='nav-list'>
          <li className='nav-list-item'>
            <IndexLink to={'/'} className='nav-item-link' activeClassName='active'>Home</IndexLink>
          </li>
          <li className='nav-list-item'>
            <Link to={'/page2'} className='nav-item-link' activeClassName='active'>Page 2</Link>
          </li>
        </ul>
      </nav>
    );
  }
};

export default Nav;
