import React, { PropTypes } from 'react';
import Header from '../Header';

if (process.env.BROWSER) {
  require('../../stylesheets/defaults/content.scss');
}

function App (props) {
  return (
    <main>
      <Header />
      <div className='content'>
        { props.children }
      </div>
    </main>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
