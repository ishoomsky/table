import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { usersAsyncFetch } from "./store/actions/usersActions";
import { userGroupsAsyncFetch } from "./store/actions/userGroupsActions";

import MainPage from "./pages/MainPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersAsyncFetch());
    dispatch(userGroupsAsyncFetch());
  }, []);

  return <MainPage />;
}

export default App;
