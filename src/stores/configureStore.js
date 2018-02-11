import { createStore, applyMiddleware, compose } from 'redux';
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
  
  const composeEnhancers =
    typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;
  
  const enhancer = composeEnhancers(
    applyMiddleware(epicMiddleware, router, logger),
    // other store enhancers if any
  );
  
  //const createStoreWithMiddleware = applyMiddleware(epicMiddleware, router, logger)(createStore);

  //return createStoreWithMiddleware(rootReducer, initialState);
  return createStore(rootReducer, enhancer);
}
