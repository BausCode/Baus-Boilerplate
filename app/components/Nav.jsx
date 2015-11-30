import React from 'react';

class Nav extends React.Component {
  render() {
    let itemStyles = {
      display: 'inline-block',
      margin: '0 1em 0 0'
    };

    return (
      <nav>
        <ul>
          <li style={itemStyles}><a href="/">Home</a></li>
          <li style={itemStyles}><a href="/page2">Page 2</a></li>
        </ul>
      </nav>
    );
  }
};

export default Nav;
