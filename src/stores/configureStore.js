import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
//import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import { combineEpics } from 'redux-observable';
import { epics as authEpics } from '../ducks/auth';
import { epics as cardEpics } from '../ducks/card';

import rootReducer from '../reducers/index';

export default function configureStore(history, initialState) {
  const rootEpic = combineEpics(authEpics, cardEpics);
  
  const logger = createLogger();
  const router = routerMiddleware(history);
  
  const epicMiddleware = createEpicMiddleware(rootEpic);
  const createStoreWithMiddleware = applyMiddleware(epicMiddleware, router, logger)(createStore);

  return createStoreWithMiddleware(rootReducer, initialState);
}