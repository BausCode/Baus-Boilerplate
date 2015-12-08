import App from './components/App';
import Index from './components/Index/Index';
import Page2 from './components/Page2/Index';
import NoMatch from './components/NoMatch';

export default [
  {
    path: '/',
    component: App,
    indexRoute: { component: Index },
    childRoutes: [
      { path: '/', component: Index },
      { path: 'page2', component: Page2 },
      { path: '*', component: NoMatch }
    ]
  }
];
