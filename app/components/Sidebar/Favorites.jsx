import React from 'react';

class Favorites extends React.Component {
  render () {
    return (
      <div>
        <p className='sidebar--list-title'>Favorites</p>
        <ul className='sidebar--list'>
          <li><a href='' title=''>Favorite Item 1</a></li>
          <li><a href='' title=''>Favorite Item 2</a></li>
          <li><a href='' title=''>Favorite Item 3</a></li>
        </ul>
      </div>
    );
  };
};

export default Favorites;
