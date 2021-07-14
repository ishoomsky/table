const initState = {
  status: null,
  userGroups: [],
};

export const USERGROUPS_LOADING = "USERGROUPS_LOADING";
export const USERGROUPS_ERROR = "USERGROUPS_ERROR";
export const USERGROUPS_SET = "USERGROUPS_SET";

export const USERGROUPS_FETCH = "USERGROUPS_FETCH";

export const userGroupsReducer = (state = initState, action) => {
  switch (action.type) {
    case USERGROUPS_LOADING: {
      let newState = {
        status: "START",
        userGroups: [],
      };
      return newState;
    }

    case USERGROUPS_ERROR: {
      let newState = {
        status: "ERROR",
        userGroups: [],
      };
      return newState;
    }

    case USERGROUPS_SET: {
      const newState = {
        status: "LOADED",
        userGroups: action.payload,
      };
      return newState;
    }

    default:
      return state;
  }
};

export const userGroupsLoading = () => ({ type: USERGROUPS_LOADING });
export const userGroupsError = () => ({ type: USERGROUPS_ERROR });
export const userGroupsSet = (payload) => ({ type: USERGROUPS_SET, payload });

export const userGroupsFetch = () => ({ type: USERGROUPS_FETCH });
