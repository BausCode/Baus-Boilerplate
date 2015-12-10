import React from 'react';

class Repo extends React.Component {
  render () {
    var itemClass = 'dashboard-list--item repo-status-' + this.props.status;
    return (
      <li className={itemClass}>
        <p className='dashboard-list--title'>{this.props.name}</p>
        <p className='dashboard-list--update'>Last Update: {this.props.update}</p>
        <p className='dashboard-list--favorite'>{this.props.favorite}</p>
      </li>
    );
  };
};

export default Repo;
