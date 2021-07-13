import { put, takeEvery, call } from "redux-saga/effects";
import {
  USERGROUPS_FETCH,
  USERGROUP_SET,
  userGroupsSet,
} from "../reducers/userGroupsReducer";
import { setLS, getLS } from "../../functions/localStorageFunctions";

const usersApi = "https://api.jsonbin.io/b/60ec02d6a63d2870c1927632";
const localStorageKey = "app-data-user-groups";

const fetchUsersFromApi = () => fetch(usersApi);

function* userGroupsInitWorker() {
  //if local storage is empty, get data from API, set to LS, dispatch action
  const groups = yield call(() => new Set([]));
  const data = yield call(fetchUsersFromApi);
  const json = yield call(() => data.json());
  yield call(() => json?.forEach(({ group }) => groups.add(group)));
  yield call(setLS, [...groups], localStorageKey);
  yield put(userGroupsSet([...groups]));
}

export function* userGroupsWatcher() {
  yield takeEvery(USERGROUPS_FETCH, userGroupsInitWorker);
}
