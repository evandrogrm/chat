import { call, put } from 'redux-saga/effects';

import graph from '../../services/graph';

import { Creators as GraphActions } from '../ducks/graph';
import { Creators as ErrorActions } from '../ducks/error';

export function* getUserDetails(action) {
  console.log('action: ', action);
  try {
    if (!action.payload.client) {
      console.log('Invalid client on getUserDetails');
      return;
    }
    const response = yield call(graph.getUserDetails, action.payload.client);
    yield put(GraphActions.getUserDetailsSuccess(response));
  } catch (err) {
    console.error(err);
    yield put(
      ErrorActions.setError(
        'Um erro ocorreu, por favor tente novamente mais tarde.'
      )
    );
  }
}

export function* getTeams(action) {
  try {
    if (!action.payload.client) {
      console.log('Invalid client on getTeams');
      return;
    }
    const response = yield call(graph.getTeams, action.payload.client);
    yield put(GraphActions.getTeamsSuccess(response.value));
  } catch (err) {
    console.error(err);
    yield put(
      ErrorActions.setError(
        'Um erro ocorreu, por favor tente novamente mais tarde.'
      )
    );
  }
}

export function* getChannels(action) {
  try {
    const { client, groupId } = action.payload;
    if (!client) {
      console.log('Invalid client on getChannels');
      return;
    }
    const response = yield call(graph.getChannels, client, groupId);
    yield put(GraphActions.getChannelsSuccess(response.value));
  } catch (err) {
    console.error(err);
    yield put(
      ErrorActions.setError(
        'Um erro ocorreu, por favor tente novamente mais tarde.'
      )
    );
  }
}

export function* getMessages(action) {
  console.log('getMessages');
  try {
    const { client, groupId, channelId } = action.payload;
    if (!client) {
      console.log('Invalid client on getMessages');
      return;
    }
    const response = yield call(graph.getMessages, client, groupId, channelId);
    console.log('response: ', response);
    yield put(GraphActions.getMessagesSuccess(response.value));
  } catch (err) {
    console.error(err);
    yield put(
      ErrorActions.setError(
        'Um erro ocorreu, por favor tente novamente mais tarde.'
      )
    );
  }
}
