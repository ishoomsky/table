import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { usersFetch } from "./store/reducers/usersReducer";
import { userGroupsFetch } from "./store/reducers/userGroupsReducer";

import AppTable from "./components/AppTable";
// import { initLS } from "./functions/localStorageFunctions";
// import initialData from "./initData.json";

function App() {
  const dispatch = useDispatch();
  // const wut = useSelector((state) => state);
  // console.log(wut);
  useEffect(() => {
    console.log("run");
    dispatch(usersFetch());
    // initLS(initialData);
  }, []);

  useEffect(() => {
    console.log("user groups");
    dispatch(userGroupsFetch());
  }, []);

  return <AppTable />;
}

export default App;
