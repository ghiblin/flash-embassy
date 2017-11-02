import 'rxjs';
import SC from 'soundcloud';
import React from 'react';
import ReactDOM from 'react-dom';

import './style.scss';
//import 'font-awesome/css/font-awesome.css';

//import { Router, Route, IndexRoute, browserHistory } from 'react-router';
//import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import createHistory from 'history/createHashHistory';
import configureStore from './stores/configureStore';
import routes from './routes';
import { CLIENT_ID, REDIRECT_URI } from './constants/auth';

SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });

const history = createHistory();
const store = configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      { renderRoutes(routes) }
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
