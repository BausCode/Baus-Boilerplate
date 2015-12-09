import App from './components/App';
import Home from './components/Home/Index';
import Page2 from './components/Page2/Index';
import NoMatch from './components/NoMatch';

export default [
  {
    path: '/',
    component: App,
    indexRoute: { component: Home },
    childRoutes: [
      { path: '/', component: Home },
      { path: 'page2', component: Page2 },
      { path: '*', component: NoMatch }
    ]
  }
];
