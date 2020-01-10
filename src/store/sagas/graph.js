import { call, put } from 'redux-saga/effects';

import graph from '../../services/graph';

import { Creators as GraphActions } from '../ducks/graph';

export function* getUserDetails() {
  try {
    const response = yield call(graph.getUserDetails);
    yield put(GraphActions.getUserDetailsSuccess(response));
  } catch (err) {
    console.error(err);
  }
}

export function* getTeams() {
  try {
    const response = yield call(graph.getTeams);
    yield put(GraphActions.getTeamsSuccess(response.value));
  } catch (err) {
    console.error(err);
  }
}

export function* getChannels(action) {
  try {
    const { groupId } = action.payload;
    if (!groupId) {
      console.log('invalid params on getChannels from graph saga')
    }
    const response = yield call(graph.getChannels, groupId);
    yield put(GraphActions.getChannelsSuccess(response.value));
  } catch (err) {
    console.error(err);
  }
}

export function* getMessages(action) {
  try {
    const { groupId, channelId } = action.payload;
    if (!groupId || !channelId) {
      console.log('invalid params on getMessages from graph saga')
    }
    const response = yield call(graph.getMessages, groupId, channelId);
    yield put(GraphActions.getMessagesSuccess(response.value));
  } catch (err) {
    console.error(err);
  }
}
