import React, { useEffect } from "react";
import "./app.scss";
import AppTable from "./components/AppTable";
import json from "./initData.json";

const initialData = json;

function App() {
  useEffect(() => {
    // initData();
    console.log(initialData);
  });

  return (
    <>
      <AppTable />
    </>
  );
}

export default App;
