import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { usersAsyncFetch } from "./store/actions/usersActions";
import { userGroupsAsyncFetch } from "./store/actions/userGroupsActions";

import TablePage from "./pages/TablePage";
import MainPage from "./pages/MainPage";
import UserPage from "./pages/UserPage";

import * as routes from "./navigation/routes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersAsyncFetch());
    dispatch(userGroupsAsyncFetch());
  }, []);

   return (
     <Router>
       <Switch>
         <Route exact path={routes.BASE_ROUTE} component={MainPage} />
         <Route exact path={routes.TABLE} component={TablePage} />
         <Route path={routes.USER} component={UserPage} />
       </Switch>
     </Router>
   );
}

export default App;
