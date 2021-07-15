import {
  USERS_LOAD_START,
  USERS_LOAD_ERROR,
  USERS_LOAD_FINISH,
  USERS_SET,
  USERS_ASYNC_SET,
  USERS_ASYNC_FETCH,
} from "./actionTypes";

export const usersLoadStart = () => ({ type: USERS_LOAD_START });
export const usersLoadError = () => ({ type: USERS_LOAD_ERROR });
export const usersLoadFinish = () => ({ type: USERS_LOAD_FINISH });
export const usersSet = (payload) => ({ type: USERS_SET, payload });
export const usersAsyncSet = (payload) => ({ type: USERS_ASYNC_SET, payload });
export const usersAsyncFetch = () => ({ type: USERS_ASYNC_FETCH });
