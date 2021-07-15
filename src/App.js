import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { usersAsyncFetch } from "./store/actions/usersActions";
import { userGroupsAsyncFetch } from "./store/actions/userGroupsActions";

import AppTable from "./components/AppTable";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersAsyncFetch());
    dispatch(userGroupsAsyncFetch());
  }, []);

  return <AppTable />;
}

export default App;
