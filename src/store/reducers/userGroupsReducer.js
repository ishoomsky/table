const initState = {
  status: null,
  userGroups: [],
};

export const USERGROUPS_SET = "USERGROUPS_SET";
export const USERGROUPS_FETCH = "USERGROUPS_FETCH";

export const userGroupsReducer = (state = initState, action) => {
  switch (action.type) {
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

export const userGroupsSet = (payload) => ({ type: USERGROUPS_SET, payload });
export const userGroupsFetch = () => ({ type: USERGROUPS_FETCH });
