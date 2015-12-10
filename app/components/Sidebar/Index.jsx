import React from 'react';
import Search from './Search';
import Favorites from './Favorites';

if (process.env.BROWSER) {
  require('stylesheets/modules/Sidebar.scss');
}

class Sidebar extends React.Component {
  render () {
    return (
      <div className='sidebar--container'>
        <Search />
        <Favorites />
      </div>
    );
  };
};

export default Sidebar;
