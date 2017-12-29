import Rx, { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import shortid from 'shortid';

import db from '../utils/db';

const key = 'training';
// eslint-disable-next-line
window.Rx = Rx;
db.put({ _id: key, cards: [] })
// eslint-disable-next-line
  .catch(() => console.log('document already existing'));

const CARDS_LOAD = 'card/CARDS_LOAD';
const CARDS_SET = 'card/CARDS_SET';
const CARDS_ADD = 'card/CARDS_ADD';
const CARDS_UPDATE = 'card/CARDS_UPDATE';
const CARDS_SAVE_ALL = 'card/CARDS_SAVE_ALL';
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

function doSaveAllCards(cards) {
  return {
    type: CARDS_SAVE_ALL,
    cards,
  };
}

function doUpdateCards(cards) {
  return {
    type: CARDS_UPDATE,
    cards,
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

function getDoc() {
  return db.get(key);
}

function saveCard(card) {
  return getDoc()
    .then(doc => db.put({
      ...doc,
      cards: doc.cards.map(el => (el.id === card.id ? card : el)),
    }));
}

function saveAllCards(cards) {
  return getDoc()
    .then(doc => db.put({ ...doc, cards }));
}

function updateCards(cards) {
  return getDoc()
    .then(doc => db.put({
      ...doc,
      cards: doc.cards.map(c => cards.find(el => el.id === c.id) || c),
    }));
}

function deleteCard(id) {
  return getDoc()
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
        .map(cards => ([
          ...cards,
          ...action.cards
            .filter(c => cards.filter(compareCard(c)).length === 0)
            .map(({ italian, english, type }) => ({
              id: shortid.generate(),
              italian,
              english,
              type,
            })),
        ]))).map(doSaveAllCards);

const saveAllCardsEpic = action$ =>
  action$.ofType(CARDS_SAVE_ALL)
    .mergeMap(action =>
      Observable
        .fromPromise(saveAllCards(action.cards))
        .map(() => doLoadCards()));

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

const updateCardsEpic = action$ => (
  action$
    .ofType(CARDS_UPDATE)
    .mergeMap(action => (
      Observable.fromPromise(updateCards(action.cards))
    ))
    .map(doLoadCards)
);

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
  doUpdateCards,
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
  saveAllCardsEpic,
  updateCardsEpic,
);

export {
  actionCreators,
  actionTypes,
  epics,
};

export default reducer;
