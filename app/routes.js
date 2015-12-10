import App from './components/App';
import Dashboard from 'components/Dashboard';
import Settings from 'components/Settings';
import Detail from 'components/Detail';
import NoMatch from 'components/NoMatch';

export default [
  {
    path: '/',
    component: App,
    indexRoute: { component: Dashboard },
    childRoutes: [
      { path: '/', component: Dashboard },
      { path: '/settings', component: Settings },
      { path: '/:repoName', component: Detail },
      { path: '*', component: NoMatch }
    ]
  }
];
