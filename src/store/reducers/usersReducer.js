const initState = {
  status: null,
  users: [],
};

export const USERS_LOADING = "USERS_LOADING";
export const USERS_ERROR = "USERS_ERROR";
export const USERS_SET = "USERS_SET";
export const USERS_ASYNC_SET = "USERS_ASYNC_SET";
export const USERS_FETCH = "USERS_FETCH";

export const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case USERS_LOADING: {
      let newState = {
        status: "START",
        users: [],
      };
      return newState;
    }

    case USERS_ERROR: {
      let newState = {
        status: "ERROR",
        users: [],
      };
      return newState;
    }

    case USERS_SET: {
      let newState = {
        status: "LOADED",
        users: action.payload,
      };
      return newState;
    }

    default:
      return state;
  }
};

export const usersLoading = () => ({ type: USERS_LOADING });

export const usersError = () => ({ type: USERS_ERROR });

export const usersSet = (payload) => ({ type: USERS_SET, payload });

export const usersAsyncSet = (payload) => ({ type: USERS_ASYNC_SET, payload });

export const usersFetch = () => ({ type: USERS_FETCH });
