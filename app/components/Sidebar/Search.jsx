import React from 'react';

class Search extends React.Component {
  render () {
    return (
      <input type='search' placeholder='Search...' name='search' className='sidebar--search' />
    );
  };
};

export default Search;
