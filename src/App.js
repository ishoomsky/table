import React, { useEffect } from "react";
import AppTable from "./components/AppTable";
import { initLS } from "./functions/localStorageFunctions";
import initialData from "./initData.json";


const lsKey = "app-data";

function App() {
  useEffect(() => {
    initLS(lsKey, initialData);
    // console.log(initialData);
  }, []);

  return (
    <>
      <AppTable />
    </>
  );
}

export default App;
