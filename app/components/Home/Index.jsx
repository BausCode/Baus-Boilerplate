import React from 'react';
import Title from './Title.jsx';
import Description from './Description.jsx';

if (process.env.BROWSER) {
  require('../../stylesheets/modules/Dashboard.scss');
}

class Main extends React.Component {
  render () {
    return (
      <div className='page-content'>
        <Title />
        <Description />
      </div>
    );
  }
}

export default Main;
