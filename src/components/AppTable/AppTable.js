import React, { useEffect, useState } from "react";
import { Content } from "carbon-components-react";

import { getLS } from "../../functions/localStorageFunctions";

export default function AppTable() {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const data = getLS("app-data");
    setRowData(data);
  }, []);

  const jsx = rowData.map(({ id, name, balance, isActive }) => (
    <div key={id}>
      {name}, {balance}, {isActive}
    </div>
  ));

  return <div>{jsx}</div>;
}
