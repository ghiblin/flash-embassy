import SC from 'soundcloud';
import { CLIENT_ID, REDIRECT_URI } from '../constants/auth';
import { actionCreators as trackActionCreators } from './track';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';

const AUTH = 'auth/AUTH';
const SESSION_SET = 'auth/SESSION_SET';
const ME_SET = 'auth/ME_SET';

function doSetMe(user) {
  return {
    type: ME_SET,
    user
  }
}

function doSetSession(session) {
  return {
    type: SESSION_SET,
    session
  }
}

function doAuth() {
  return {
    type: AUTH
  }
}

const authEpic = (action$) => (
  action$
    .ofType(AUTH)
    .mergeMap(() =>
      Observable
        .fromPromise(SC.connect())
        .map(doSetSession)
    )
  );

const fetchMeEpic = (action$) =>
  action$.ofType(SESSION_SET)
    .mergeMap((action) =>
      Observable.ajax({
          crossDomain: true,
          url: `//api.soundcloud.com/me?oauth_token=${action.session.oauth_token}`
        })
        .map(({ response }) => doSetMe(response))
    );

const fetchStreamEpic = (action$) =>
  action$.ofType(SESSION_SET)
    .mergeMap((action) =>
      Observable.ajax({
          crossDomain: true,
          url: `//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${action.session.oauth_token}`
        })
        .map(({ response }) => trackActionCreators.doSetTracks(response.collection))
    );

const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ME_SET:
      return applySetMe(state, action);
  }
  return state;
}

function applySetMe(state, action) {
  const { user } = action;
  return { ...state, user };
}

const actionCreators = {
  doAuth,
}

const actionTypes = {
  AUTH
}

const epics = combineEpics(authEpic, fetchMeEpic, fetchStreamEpic);

export {
  actionCreators,
  actionTypes,
  epics,
}

export default reducer;