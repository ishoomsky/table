import { put, takeEvery, call } from "redux-saga/effects";
import {
  USERGROUPS_FETCH,
  userGroupsSet,
  userGroupsLoading,
  userGroupsError,
} from "../reducers/userGroupsReducer";
import { setLS, getLS } from "../../functions/localStorageFunctions";

const usersApi = "https://api.jsonbin.io/b/60ec02d6a63d2870c1927632";
const localStorageKey = "app-data-user-groups";

const fetchUsersFromApi = () => fetch(usersApi);

function* userGroupsInitWorker() {
  if (localStorage.getItem(localStorageKey) !== null) {
    //if local storage is not empty, get data from LS, dispatch action
    const data = yield call(getLS, localStorageKey);
    yield put(userGroupsSet(data)); //get state from LocalStorage
  } else {
    //if local storage is empty, get data from API, set to LS, dispatch action
    yield put(userGroupsLoading()); // set state is LOADING
    try {
      // throw "myException";
      const groups = yield call(() => new Set([]));
      const data = yield call(fetchUsersFromApi);
      const json = yield call(() => data.json());
      yield call(() => json?.forEach(({ group }) => groups.add(group)));
      yield call(setLS, [...groups], localStorageKey);
      yield put(userGroupsSet([...groups]));
    } catch (err) {
      console.log(err);
      yield put(userGroupsError()); //if error loading, throw error
    }
  }
}

export function* userGroupsWatcher() {
  yield takeEvery(USERGROUPS_FETCH, userGroupsInitWorker);
}
