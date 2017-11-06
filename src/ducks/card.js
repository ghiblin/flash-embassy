import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import db from '../utils/db';

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
  return db.get('training')
    .catch(err => {
      if (err.name === 'not_found') {
        return {
          _id: 'training',
          cards: []
        };
      } else {
        throw err;
      }
    });
}


function saveCards(cards) {
  return db.get('training')
    .catch(err => { 
      if (err.name === 'not_found') {
        return { 
          _id:'traning', 
          cards:[]
        };
      }  
      throw err;
    })
    .then(doc => {
      doc.cards = cards;
      return db.put(doc);
    });
}

const loadCardsEpic = (action$) =>
  action$.ofType(CARDS_LOAD)
    .mergeMap(() =>
      Observable
        .fromPromise(loadCards())
        .map(doc => doc.cards)
        .map(doSetCards)
    )

const saveCardsEpic = (action$) =>
  action$.ofType(CARDS_SAVE)
    .mergeMap((action) => {
console.log('saveCardsEpic:', action);
      return Observable
        .fromPromise(saveCards(action.cards))
        .map(doc => doc.ok ? doSetCards(action.cards) : null);
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