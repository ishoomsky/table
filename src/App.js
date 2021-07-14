import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { usersFetch } from "./store/reducers/usersReducer";
import { userGroupsFetch } from "./store/reducers/userGroupsReducer";

import AppTable from "./components/AppTable";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersFetch());
    dispatch(userGroupsFetch());
  }, []);

  return <AppTable />;
}

export default App;
