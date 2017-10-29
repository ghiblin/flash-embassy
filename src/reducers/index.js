import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import card from '../ducks/card';
import auth from '../ducks/auth';
import track from '../ducks/track';

export default combineReducers({
  card,
  auth,
  track,
  routing: routerReducer
});