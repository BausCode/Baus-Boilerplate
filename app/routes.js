import App from './components/App';
import Main from './components/main/Index';
import Page2 from './components/Page2/Index';
import NoMatch from './components/NoMatch';

export default [
  {
    path: '/',
    component: App,
    indexRoute: { component: Main },
    childRoutes: [
      { path: '/', component: Main },
      { path: 'page2', component: Page2 },
      { path: '*', component: NoMatch }
    ]
  }
];
