import {
  USERGROUPS_LOAD_START,
  USERGROUPS_LOAD_ERROR,
  USERGROUPS_LOAD_FINISH,
  USERGROUPS_SET,
  USERGROUPS_ASYNC_FETCH,
} from "./actionTypes";

export const userGroupsLoadStart = () => ({ type: USERGROUPS_LOAD_START });
export const userGroupsLoadError = () => ({ type: USERGROUPS_LOAD_ERROR });
export const userGroupsLoadFinish = () => ({ type: USERGROUPS_LOAD_FINISH });
export const userGroupsSet = (payload) => ({ type: USERGROUPS_SET, payload });
export const userGroupsAsyncFetch = () => ({ type: USERGROUPS_ASYNC_FETCH });
