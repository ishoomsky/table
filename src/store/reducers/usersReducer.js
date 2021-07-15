import {
  USERS_LOAD_START,
  USERS_LOAD_ERROR,
  USERS_LOAD_FINISH,
  USERS_SET,
} from "../actions/actionTypes";

const initState = {
  loaded: null,
  error: null,
  users: [],
};

const usersLoadStart = (state) => {
  const updater = {
    loaded: false,
    error: false,
  };
  return { ...state, ...updater };
};

const usersLoadError = (state) => {
  const updater = {
    loaded: false,
    error: true,
  };
  return { ...state, ...updater };
};

const usersLoadFinish = (state) => {
  const updater = {
    loaded: true,
    error: false,
  };
  return { ...state, ...updater };
};

const usersSet = (state, action) => {
  const updater = {
    users: action.payload,
  };
  return { ...state, ...updater };
};

export const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case USERS_LOAD_START: {
      return usersLoadStart(state);
    }
    case USERS_LOAD_ERROR: {
      return usersLoadError(state);
    }
    case USERS_LOAD_FINISH: {
      return usersLoadFinish(state);
    }
    case USERS_SET: {
      return usersSet(state, action);
    }
    default:
      return state;
  }
};
