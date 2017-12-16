import 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';

import './style.scss';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import createHistory from 'history/createHashHistory';
import configureStore from './stores/configureStore';
import routes from './routes';

import './utils/db';

const history = createHistory();
const store = configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      { renderRoutes(routes) }
    </ConnectedRouter>
  </Provider>,
  document.getElementById('content')
);
