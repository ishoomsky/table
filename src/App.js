import React, { useEffect } from "react";
import AppTable from "./components/AppTable";
import { initLS } from "./functions/localStorageFunctions";
import initialData from "./initData.json";

function App() {
  useEffect(() => {
    initLS(initialData);
  }, []);

  return <AppTable />;
}

export default App;
