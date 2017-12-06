import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import shortid from 'shortid';

import db from '../utils/db';

const key = 'training';

db.put({ _id: key, cards: [] })
// eslint-disable-next-line
  .catch(() => console.log('document already existing'));

const CARDS_LOAD = 'card/CARDS_LOAD';
const CARDS_SET = 'card/CARDS_SET';
const CARDS_ADD = 'card/CARDS_ADD';
const CARD_CREATE = 'card/CARD_CREATE';
const CARD_SAVE = 'card/CARD_SAVE';
const CARD_DELETE = 'card/CARD_DELETE';
function doLoadCards() {
  return {
    type: CARDS_LOAD,
  };
}

function doSetCards(cards) {
  return {
    type: CARDS_SET,
    cards,
  };
}

function doAddCards(cards) {
  return {
    type: CARDS_ADD,
    cards,
  };
}

function doSaveCard(card) {
  return {
    type: card.id ? CARD_SAVE : CARD_CREATE,
    card: {
      ...card,
      id: card.id || shortid.generate(),
    },
  };
}

function doDeleteCard(id) {
  return {
    type: CARD_DELETE,
    id,
  };
}

function loadCards() {
  return db.get(key);
}
// eslint-disable-next-line
window.loadCards = loadCards;

function compareWord(w1, w2) {
  return (w1 || '').toLowerCase() === (w2 || '').toLowerCase();
}

const compareCard = c1 => c2 => (
  compareWord(c1.italian, c2.italian) &&
  compareWord(c1.english, c2.english) &&
  compareWord(c1.type, c2.type)
);

function createCard(card) {
  return db.get(key)
    .then(doc => db.put({
      ...doc,
      cards: [...doc.cards, card],
    }));
}

function saveCard(card) {
  return db.get(key)
    .then(doc => db.put({
      ...doc,
      cards: doc.cards.map(el => (el.id === card.id ? card : el)),
    }));
}

function deleteCard(id) {
  return db.get(key)
    .then(doc => db.put({
      ...doc,
      cards: doc.cards.filter(el => (el.id !== id)),
    }));
}

const loadCardsEpic = action$ =>
  action$.ofType(CARDS_LOAD)
    .mergeMap(() =>
      Observable
        .fromPromise(loadCards())
        .map(doc => doc.cards)
        .map(doSetCards));

const addCardsEpic = action$ =>
  action$.ofType(CARDS_ADD)
    .mergeMap(action =>
      Observable
        .fromPromise(loadCards())
        .map(doc => doc.cards)
        .map((cards) => {
          const newCards = [
            ...cards,
            ...action.cards.filter(c => cards.filter(compareCard(c)).length === 0),
          ];
          console.log('newCards:', newCards);
          return newCards;
        }).map(doSetCards));

const createCardEpic = action$ =>
  action$.ofType(CARD_CREATE)
    .mergeMap(action =>
      Observable
        .fromPromise(createCard(action.card))
        .map(doc => (doc.ok ? doLoadCards() : null)));

const saveCardEpic = action$ =>
  action$.ofType(CARD_SAVE)
    .mergeMap(action =>
      Observable
        .fromPromise(saveCard(action.card))
        .map(doc => (doc.ok ? doLoadCards() : null)));

const deleteCardEpic = action$ =>
  action$.ofType(CARD_DELETE)
    .mergeMap(action =>
      Observable
        .fromPromise(deleteCard(action.id))
        .map(doc => (doc.ok ? doLoadCards() : null)));

const intialState = {
  cards: [],
  filter: '',
};

function applySetCards(state, action) {
  const { cards } = action;
  return {
    ...state,
    cards,
  };
}

function reducer(state = intialState, action) {
  switch (action.type) {
    case CARDS_SET:
      return applySetCards(state, action);

    default:
      return state;
  }
}

const actionCreators = {
  doLoadCards,
  doAddCards,
  doSaveCard,
  doDeleteCard,
};

const actionTypes = {
  CARDS_LOAD,
};

const epics = combineEpics(
  loadCardsEpic,
  addCardsEpic,
  saveCardEpic,
  createCardEpic,
  deleteCardEpic,
);

export {
  actionCreators,
  actionTypes,
  epics,
};

export default reducer;
