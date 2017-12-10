import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';

import { epics as cardEpics } from '../ducks/card';

import rootReducer from '../reducers/index';

export default function configureStore(history, initialState) {
  const rootEpic = combineEpics(cardEpics);

  const logger = createLogger();
  const router = routerMiddleware(history);

  const epicMiddleware = createEpicMiddleware(rootEpic);
  const createStoreWithMiddleware = applyMiddleware(epicMiddleware, router, logger)(createStore);

  return createStoreWithMiddleware(rootReducer, initialState);
}
