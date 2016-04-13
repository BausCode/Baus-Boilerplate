import React from 'react';
import Title from '../components/Home/Title.jsx';
import Description from '../components/Home/Description.jsx';

if (process.env.BROWSER) {
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
