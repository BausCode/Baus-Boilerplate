import React from 'react';
import Repo from './Repo';

class RepoList extends React.Component {
  render () {
    var repoItems = this.props.data.map( function(repo) {
      return (
        <Repo id={repo.id} name={repo.name} status={repo.status} update={repo.update} favorite={repo.favorite} />
      );
    });

    return (
      <ul className='dashboard--list'>
        {repoItems}
      </ul>
    );
  };
};

export default RepoList;
