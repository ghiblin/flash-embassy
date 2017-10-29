import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

const STORE_KEY = 'flash-embassy-cards';

const CARDS_LOAD = 'card/CARDS_LOAD';
const CARDS_SET = 'card/CARDS_SET';
const CARD_ADD = 'card/CARD_ADD';

function doLoadCards() {
  return {
    type: CARDS_LOAD
  }
}

function doSetCards(cards) {
  return {
    type: CARDS_SET,
    cards
  }
}

function doAddCard(card) {
  return {
    type: CARD_ADD,
    card
  }
}

function loadCards() {
  JSON.parse(localStorage.getItem(STORE_KEY)) || [];
}

function saveCards(cards) {
  localStorage.setItem(STORE_KEY, JSON.serialize(cards));
}

const loadCardsEpic = (action$) =>
  action$.ofType(CARDS_LOAD)
    .mergeMap(() =>
      Observable
        .from(loadCards())
        .map(doSetCards)
    )
/*
const addCardEpic = (action$) =>
  action$.ofType(CARD_ADD)
    .map()
*/

const intialState = {
  cards: [],
}

function reducer(state = intialState, action) {
  switch(action.type) {
    case CARDS_SET:
      return applySetCards(state, action);
  }

  return state;
}

function applySetCards(state, action) {
  const { cards } = action;
  return {
    ...state,
    cards
  };
}

const actionCreators = {
  doLoadCards,
}

const actionTypes = {
  CARDS_LOAD,
}

const epics = combineEpics(loadCardsEpic);

export {
  actionCreators,
  actionTypes,
  epics,
}

export default reducer;