import App from './components/App.jsx';
import Main from './components/main/Index.jsx';
import Page2 from './components/Page2/Index.jsx';
import NoMatch from './components/NoMatch.jsx';

export default [
  {
    path: '/',
    component: App,
    indexRoute: { component: Main },
    childRoutes: [
      { path: 'page2', component: Page2 },
      { path: '*', component: NoMatch }
    ]
  }
];
