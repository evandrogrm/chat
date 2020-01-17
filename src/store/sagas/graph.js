import { call, put, delay } from 'redux-saga/effects';

import graph from '../../services/graph';

import { Creators as GraphActions } from '../ducks/graph';

export function* getUserDetails() {
  try {
    yield delay(process.env.REACT_APP_DELAY_REQUEST || 0);
    const response = yield call(graph.getUserDetails);
    yield put(GraphActions.getUserDetailsSuccess(response));
  } catch (err) {
    if (process.env.REACT_APP_SHOW_ERROR === true) {
      console.error('getUserDetails', err);
    }
    if (err.code === 'ClientAuthError') {
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
    if (process.env.REACT_APP_SHOW_ERROR === true) {
      console.error('getTeams', err);
    }
  }
}

export function* getChannels(action) {
  try {
    const { groupId } = action.payload;
    if (!groupId) {
      if (process.env.REACT_APP_SHOW_LOG === true)
        console.log('invalid params on getChannels', action.payload);
      return;
    }
    yield delay(process.env.REACT_APP_DELAY_REQUEST, 0);
    const response = yield call(graph.getChannels, groupId);
    yield put(GraphActions.getChannelsSuccess(response.value));
  } catch (err) {
    if (process.env.REACT_APP_SHOW_ERROR === true) {
      console.error('getChannels', err);
    }
  }
}

export function* getMessages(action) {
  try {
    const { groupId, channelId } = action.payload;
    if (!groupId || !channelId) {
      if (process.env.REACT_APP_SHOW_LOG === true)
        console.log('invalid params on getMessages', action.payload);
      return;
    }
    yield delay(process.env.REACT_APP_DELAY_REQUEST, 0);
    const response = yield call(graph.getMessages, groupId, channelId);
    yield put(GraphActions.getMessagesSuccess(response.value));

    // TODO: CONTINUE SUBSCRIBE GET MESSAGES
    // if (process.env.REACT_APP_SET_INTERVAL || false) {
    //   let _groupId = Object.assign({}, groupId);
    //   let _channelId = Object.assign({}, channelId);
    //   const interval = setInterval(function* intervalFunction() {
    //     console.log('iniciou interval');
    //     if (groupId !== _groupId || channelId !== _channelId) {
    //       console.log('clearInterval');
    //       clearInterval(interval);
    //     }
    //     yield delay(process.env.REACT_APP_DELAY_REQUEST, 0);
    //     const res = yield call(graph.getMessages, groupId, channelId);
    //     console.log('res: ', res);
    //     yield put(GraphActions.getMessagesSuccess(res.value));
    //   }, process.env.REACT_APP_INTERVAL || 1000);
    // }
  } catch (err) {
    if (process.env.REACT_APP_SHOW_ERROR === true) {
      console.error('getMessages', err);
    }
  }
}
