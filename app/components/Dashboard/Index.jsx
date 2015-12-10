import React from 'react';
import Title from './Title';
import Description from './Description';
import RepoList from './RepoList';

if (process.env.BROWSER) {
  require('stylesheets/modules/Dashboard.scss');
}

/*
 * Repo Data Types
 * id : int - standard generated id
 * name : string - repo name from github
 * status : int - Gitbaus status: 1=good, 2=processing, 3=bad
 * update : date - last time merge was made and GitBaus analyzed
 * favorite : boolean - marked as a user favorite
 * stats : array - TBD array of stats to display current activity
 */
var repoList = [
  { id: 1, name: 'First Repo Test', status: 1, update: 'Tue Dec  8 22:26:42', favorite: false, stats: []},
  { id: 2, name: 'Another Repo', status: 3, update: 'Tue Dec  1 22:26:42', favorite: true, stats: []},
];

class Main extends React.Component {
  render () {
    return (
      <div className='page-content'>
        <Title />
        <Description />
        <RepoList data={repoList} />
      </div>
    );
  }
};

export default Main;
