import App from '../components/App';
import Home from '../components/Home';
import Dictionary from '../components/Dictionary';
import Cards from '../components/Cards';
import Stream from '../components/Stream';
import Callback from '../components/Callback';

import NotFound from './NotFound';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/dictionary',
        component: Dictionary,
      },
      {
        path: '/training',
        component: Cards,
      },
      {
        path: '/sc',
        exact: true,
        component: Stream,
      },
      {
        path: '/callback',
        exact: true,
        component: Callback,
      },
      {
        component: NotFound,
      }
    ]
  }
];
