import React from 'react';

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <ul className="clearfix">
          <li><a href="/">Home</a></li>
          <li><a href="/page2">Page 2</a></li>
        </ul>
      </nav>
    );
  }
};

export default Nav;
