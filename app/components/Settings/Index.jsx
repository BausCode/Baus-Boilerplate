import React from 'react';

if (process.env.BROWSER) {
  require('stylesheets/modules/Page.scss');
}

class Settings extends React.Component {
  render () {
    return ( 
      <div>
        <h2 className="pageTitle">Settings</h2>
      </div>
    );
  }
};

export default Settings;
