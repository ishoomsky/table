import {
  USERGROUPS_LOAD_START,
  USERGROUPS_LOAD_ERROR,
  USERGROUPS_LOAD_FINISH,
  USERGROUPS_SET,
} from "../actions/actionTypes";

const initState = {
  loaded: false,
  error: false,
  userGroups: [],
};

const userGroupsLoadStart = (state) => {
  const updater = {
    loaded: false,
    error: false,
  };
  return { ...state, ...updater };
};

const userGroupsLoadError = (state) => {
  const updater = {
    loaded: false,
    error: true,
  };
  return { ...state, ...updater };
};

const userGroupsLoadFinish = (state) => {
  const updater = {
    loaded: true,
    error: false,
  };
  return { ...state, ...updater };
};

const userGroupsSet = (state, action) => {
  const updater = {
    userGroups: action.payload,
  };
  return { ...state, ...updater };
};

export const userGroupsReducer = (state = initState, action) => {
  switch (action.type) {
    case USERGROUPS_LOAD_START: {
      return userGroupsLoadStart(state);
    }
    case USERGROUPS_LOAD_ERROR: {
      return userGroupsLoadError(state);
    }
    case USERGROUPS_LOAD_FINISH: {
      return userGroupsLoadFinish(state);
    }
    case USERGROUPS_SET: {
      return userGroupsSet(state, action);
    }

    default:
      return state;
  }
};
