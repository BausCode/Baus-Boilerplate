import React from 'react';
import Title from './components/Title.jsx';
import Description from './components/Description.jsx';

class Main extends React.Component {
  render () {
    return (
      <div>
        <Title />
        <Description />
      </div>
    );
  }
};

export default Main;
