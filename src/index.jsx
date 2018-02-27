/* global document */
import 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import configureStore from './stores/configureStore';
import App from './components/App';

import './utils/db';
import './style.scss';

const history = createHistory();
const store = configureStore(history, { remoteDicts });

function ready(loadApp) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    loadApp();
  } else {
    document.addEventListener('DOMContentLoaded', loadApp);
  }
}
ready(() => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root-app'),
  );
});
