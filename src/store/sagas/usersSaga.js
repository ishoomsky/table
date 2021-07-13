import { put, takeEvery, call } from "redux-saga/effects";
import {
  USERS_FETCH,
  USERS_ASYNC_SET,
  usersSet,
  usersLoading,
  usersError,
} from "../reducers/usersReducer";
import { setLS, getLS } from "../../functions/localStorageFunctions";

const usersApi = "https://api.jsonbin.io/b/60ec02d6a63d2870c1927632";
const localStorageKey = "app-data-users";

const fetchUsersFromApi = () => fetch(usersApi);

function* usersInitWorker() {
  if (localStorage.getItem(localStorageKey) !== null) {
    //if local storage is not empty, get data from LS, dispatch action

    const data = yield call(getLS, localStorageKey);
    yield put(usersSet(data));
  } else {
    //if local storage is empty, get data from API, set to LS, dispatch action
    yield put(usersLoading());
    try {
      // throw "myException";
      const data = yield call(fetchUsersFromApi);
      const json = yield call(
        () => new Promise((resolve) => resolve(data.json()))
      );

      yield call(setLS, json, localStorageKey);
      yield put(usersSet(json));
    } catch (err) {
      console.log(err);
      yield put(usersError()); //if error loading, throw error
    }
  }
}

function* usersSetWorker(action) {
  yield call(setLS, action.payload);
  yield put(usersSet(action.payload));
}

export function* usersWatcher() {
  yield takeEvery(USERS_FETCH, usersInitWorker);
  yield takeEvery(USERS_ASYNC_SET, usersSetWorker);
}
