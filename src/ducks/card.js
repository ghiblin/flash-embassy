import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

const STORE_KEY = 'flash-embassy-cards';

const CARDS_LOAD = 'card/CARDS_LOAD';
const CARDS_SET = 'card/CARDS_SET';
const CARDS_SAVE = 'card/CARDS_SAVE';

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

function doSaveCards(cards) {
  return {
    type: CARDS_SAVE,
    cards
  }
}

function loadCards() {
  return new Promise((resolve, reject) => {
    resolve(JSON.parse(localStorage.getItem(STORE_KEY)) || [{italian:'ciao',english:'hello'}]);
  });
}

function saveCards(cards) {
console.log('saveCards:', cards, JSON.stringify(cards));
  return new Promise((resolve, reject) => {
    localStorage.setItem(STORE_KEY, JSON.stringify(cards));
    resolve(cards);
  });
}

const loadCardsEpic = (action$) =>
  action$.ofType(CARDS_LOAD)
    .mergeMap(() =>
      Observable
        .fromPromise(loadCards())
        .map(doSetCards)
    )

const saveCardsEpic = (action$) =>
  action$.ofType(CARDS_SAVE)
    .mergeMap((action) => {
console.log('saveCardsEpic:', action);
      return Observable
        .fromPromise(saveCards(action.cards))
        .map(doSetCards)
    }
  );

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
  doSaveCards,
}

const actionTypes = {
  CARDS_LOAD,
}

const epics = combineEpics(loadCardsEpic, saveCardsEpic);

export {
  actionCreators,
  actionTypes,
  epics,
}

export default reducer;