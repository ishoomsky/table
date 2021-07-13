import { all } from "redux-saga/effects";
import { usersWatcher } from "./usersSaga";
import { userGroupsWatcher } from "./userGroupSaga";

export default function* rootWatcher() {
  yield all([usersWatcher(), userGroupsWatcher()]);
}
