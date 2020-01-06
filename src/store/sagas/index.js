import { all, takeLatest, takeEvery } from "redux-saga/effects";
/**
 * TYPES
 */
// import { Types as ReenrollmentTypes } from "../ducks/reenroll";

/**
 * SAGAS
 */
// import { reenroll } from "./reenroll";

export default function* rootSaga() {
  yield all([
    // takeLatest(ReenrollmentTypes.POST_REQUEST, reenroll),
  ]);
}
