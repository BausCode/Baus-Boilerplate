import React from 'react';

if (process.env.BROWSER) {
  require('stylesheets/modules/Page.scss');
}

class Page2 extends React.Component {
  render () {
    return ( 
      <div>
        <h2 className="pageTitle">Page 2 Something</h2>
      </div>
    );
  }
};

export default Page2;
