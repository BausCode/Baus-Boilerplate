import React from 'react';

if (process.env.BROWSER) {
  require('./style.scss');
}

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <ul className="nav-list">
          <li className="nav-list-item"><a href="/" className="nav-item-link">Home</a></li>
          <li className="nav-list-item"><a href="/page2" className="nav-item-link">Page 2</a></li>
        </ul>
      </nav>
    );
  }
};

export default Nav;
