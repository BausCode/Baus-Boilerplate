import React from 'react';
import Title, { type } from 'components/Title';

function Home () {
  return (
    <div className='page-content'>
      <Title type={ type.large }>Home Page</Title>
      <p>This is a boilerplate for Universal JS Apps using Webpack, React, ES6, Sass, and prepared to be deployed via Docker.</p>
    </div>
  );
}

export default Home;
