import { put, call, takeLatest, all } from "redux-saga/effects";
import { USERS_ASYNC_FETCH, USERS_ASYNC_SET } from "../actions/actionTypes";
import {
  usersSet,
  usersLoadStart,
  usersLoadError,
  usersLoadFinish,
} from "../actions/usersActions";
import * as storageAPI from "../../functions/localStorageAPI";

const usersApi = "https://api.jsonbin.io/b/60ec02d6a63d2870c1927632/3";
const localStorageKey = "app-data-users";

const fetchUsersFromApi = () => fetch(usersApi);
const isLsEmpty = storageAPI.isLocalStorageEmpty(localStorageKey);

function* usersFetchWorker() {
  if (isLsEmpty) {
    //if local storage is not empty, get data from LS, dispatch action
    const users = yield call(storageAPI.get, localStorageKey);
    yield put(usersSet(users));
    yield put(usersLoadFinish());
  } else {
    //if local storage is empty, get data from API, set to LS, dispatch action
    try {
      yield put(usersLoadStart());
      const data = yield call(fetchUsersFromApi);
      const json = yield call(() => data.json());

      yield call(storageAPI.set, json, localStorageKey);
      yield put(usersSet(json));
      yield put(usersLoadFinish());
    } catch (err) {
      yield put(usersLoadError()); //if error loading, throw error
    }
  }
}

function* usersSetWorker(action) {
  yield call(storageAPI.set, action.payload, localStorageKey);
  yield put(usersSet(action.payload));
}

export function* usersWatcher() {
  yield all([
    takeLatest(USERS_ASYNC_FETCH, usersFetchWorker),
    takeLatest(USERS_ASYNC_SET, usersSetWorker),
  ]);
}
