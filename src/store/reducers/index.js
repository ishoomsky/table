import { combineReducers } from "redux";
import { usersReducer } from "./usersReducer";
import { userGroupsReducer } from "./userGroupsReducer";

export const rootReducer = combineReducers({
  users: usersReducer,
  userGroups: userGroupsReducer,
});
