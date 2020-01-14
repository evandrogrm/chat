import { call, put, delay } from 'redux-saga/effects';

import graph from '../../services/graph';

import { Creators as GraphActions } from '../ducks/graph';

export function* getUserDetails() {
  try {
    console.log('process.env.REACT_APP_DELAY_REQUEST: ', process.env.REACT_APP_DELAY_REQUEST);
    yield delay(process.env.REACT_APP_DELAY_REQUEST, 0);
    const response = yield call(graph.getUserDetails);
    console.log('response: ', response);
    yield put(GraphActions.getUserDetailsSuccess(response));
  } catch (err) {
    console.log('error in getUserDetails');
    console.error(err);
    if (err.code === 'ClientAuthError') {
      console.log('ClientAuthError')
      yield graph.logout();
    }
  }
}

export function* getTeams() {
  try {
    yield delay(process.env.REACT_APP_DELAY_REQUEST, 0);
    const response = yield call(graph.getTeams);
    yield put(GraphActions.getTeamsSuccess(response.value));
  } catch (err) {
    console.log('error in getTeams');
    console.error(err);
  }
}

export function* getChannels(action) {
  try {
    const { groupId } = action.payload;
    if (!groupId) {
      console.log('invalid params on getChannels from graph saga');
      return;
    }
    yield delay(process.env.REACT_APP_DELAY_REQUEST, 0);
    const response = yield call(graph.getChannels, groupId);
    yield put(GraphActions.getChannelsSuccess(response.value));
  } catch (err) {
    console.log('error in getChannels');
    console.error(err);
  }
}

export function* getMessages(action) {
  try {
    const { groupId, channelId } = action.payload;
    if (!groupId || !channelId) {
      console.log('invalid params on getMessages from graph saga');
      return;
    }
    yield delay(process.env.REACT_APP_DELAY_REQUEST, 0);
    const response = yield call(graph.getMessages, groupId, channelId);
    yield put(GraphActions.getMessagesSuccess(response.value));
  } catch (err) {
    console.log('error in getMessages');
    console.error(err);
  }
}
