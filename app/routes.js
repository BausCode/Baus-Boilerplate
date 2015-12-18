import App from './components/App';
import Home from './components/Home';
import Counter from './components/Counter';
import NoMatch from './components/NoMatch';

export default [
  {
    path: '/',
    component: App,
    indexRoute: { component: Home },
    childRoutes: [
      { path: '/', component: Home },
      { path: '/counter', component: Counter },
      { path: '*', component: NoMatch }
    ]
  }
];
