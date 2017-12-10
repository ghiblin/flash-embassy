import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import card from '../ducks/card';

export default combineReducers({
  card,
  routing: routerReducer,
});
