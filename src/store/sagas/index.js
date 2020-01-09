import { all, takeLatest, takeEvery } from "redux-saga/effects";
/**
 * TYPES
 */
import { Types as GraphTypes } from "../ducks/graph";

/**
 * SAGAS
 */
import { getUserDetails, getTeams, getChannels, getMessages } from "./graph";

export default function* rootSaga() {
  yield all([
    takeLatest(GraphTypes.GET_USER_DETAILS_REQUEST, getUserDetails),
    takeLatest(GraphTypes.GET_TEAMS_REQUEST, getTeams),
    takeLatest(GraphTypes.GET_CHANNELS_REQUEST, getChannels),
    takeLatest(GraphTypes.GET_MESSAGES_REQUEST, getMessages),
  ]);
}
