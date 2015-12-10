import App from './components/App';
import Dashboard from './components/Dashboard/Index';
import Page2 from './components/Page2/Index';
import NoMatch from './components/NoMatch';

export default [
  {
    path: '/',
    component: App,
    indexRoute: { component: Dashboard },
    childRoutes: [
      { path: '/', component: Dashboard },
      { path: 'page2', component: Page2 },
      { path: '*', component: NoMatch }
    ]
  }
];
