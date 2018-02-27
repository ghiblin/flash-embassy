import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import card from '../ducks/card';
import remoteDicts from '../ducks/remote-dicts';

export default combineReducers({
  card,
  remoteDicts,
  routing: routerReducer,
});
