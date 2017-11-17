import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import db from '../utils/db';
import shortid from 'shortid';

const key = 'training';

db.put({ _id: key, cards: [] })
  .catch(err => console.log('document already existing'));

const STORE_KEY = 'flash-embassy-cards';

const CARDS_LOAD = 'card/CARDS_LOAD';
const CARDS_SET = 'card/CARDS_SET';
const CARD_CREATE = 'card/CARD_CREATE';
const CARD_SAVE = 'card/CARD_SAVE';
const CARD_DELETE = 'card/CARD_DELETE';

function doLoadCards() {
  return {
    type: CARDS_LOAD
  };
}

function doSetCards(cards) {
  return {
    type: CARDS_SET,
    cards
  };
}

function doSaveCard(card) {
  return {
    type: card.id ? CARD_SAVE : CARD_CREATE,
    card: {
      ...card,
      id: card.id || shortid.generate()
    }
  };
}

function doDeleteCard(id) {
  return {
    type: CARD_DELETE,
    id
  };
}

function loadCards() {
  return db.get(key);
}

function createCard(card) {
  return db.get(key)
    .then(doc => db.put({
      ...doc,
      cards: [...doc.cards, card]
    }));
}

function saveCard(card) {
  return db.get(key)
    .then(doc => db.put({ 
      ...doc, 
      cards: doc.cards.map((el) => el.id === card.id ? card : el)
    }));
}

function deleteCard(id) {
  return db.get(key)
    .then(doc => db.put({
      ...doc,
      cards: doc.cards.filter(el => el.id !== id)
    }));
}

const loadCardsEpic = (action$) =>
  action$.ofType(CARDS_LOAD)
    .mergeMap(() =>
      Observable
        .fromPromise(loadCards())
        .map(doc => doc.cards)
        .map(doSetCards)
    )

const createCardEpic = (action$) =>
  action$.ofType(CARD_CREATE)
    .mergeMap((action) => {
      return Observable
        .fromPromise(createCard(action.card))
        .map(doc => doc.ok ? doLoadCards() : null)
    })

const saveCardEpic = (action$) =>
  action$.ofType(CARD_SAVE)
    .mergeMap((action) => {
      return Observable
        .fromPromise(saveCard(action.card))
        .map(doc => doc.ok ? doLoadCards() : null);
    }
  );

const deleteCardEpic = (action$) =>
  action$.ofType(CARD_DELETE)
    .mergeMap((action) => {
      return Observable
        .fromPromise(deleteCard(action.id))
        .map(doc => doc.ok ? doLoadCards() : null);
    });

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
  doSaveCard,
  doDeleteCard,
}

const actionTypes = {
  CARDS_LOAD,
}

const epics = combineEpics(loadCardsEpic, saveCardEpic, createCardEpic, deleteCardEpic);

export {
  actionCreators,
  actionTypes,
  epics,
}

export default reducer;