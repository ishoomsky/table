import { put, takeLatest, call } from "redux-saga/effects";
import { USERGROUPS_ASYNC_FETCH } from "../actions/actionTypes";
import {
  userGroupsLoadStart,
  userGroupsLoadError,
  userGroupsLoadFinish,
  userGroupsSet,
} from "../actions/userGroupsActions";
import * as storageAPI from "../../functions/localStorageAPI";

const usersApi = "https://api.jsonbin.io/b/60ec02d6a63d2870c1927632";
const localStorageKey = "app-data-user-groups";

const fetchUsersFromApi = () => fetch(usersApi);
const isLsEmpty = storageAPI.isLocalStorageNotEmpty(localStorageKey);

function* userGroupsFetchWorker() {
  if (isLsEmpty) {
    //if local storage is not empty, get data from LS, dispatch action
    const userGroups = yield call(storageAPI.get, localStorageKey);
    yield put(userGroupsSet(userGroups));
    yield put(userGroupsLoadFinish());
  } else {
    //if local storage is empty, get data from API, set to LS, dispatch action
    try {
      yield put(userGroupsLoadStart()); // set state is LOADING
      const userGroups = yield call(() => new Set([]));
      const data = yield call(fetchUsersFromApi);
      const json = yield call(() => data.json());
      yield call(() => json.forEach(({ group }) => userGroups.add(group)));

      yield call(storageAPI.set, [...userGroups], localStorageKey);
      yield put(userGroupsSet([...userGroups]));
      yield put(userGroupsLoadFinish());
    } catch (err) {
      yield put(userGroupsLoadError()); //if error loading, throw error
    }
  }
}

export function* userGroupsWatcher() {
  yield takeLatest(USERGROUPS_ASYNC_FETCH, userGroupsFetchWorker);
}
