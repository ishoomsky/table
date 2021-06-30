import React, { useEffect, useState } from "react";
import { Content } from "carbon-components-react";

import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from 'carbon-components-react';

import { getLS } from "../../functions/localStorageFunctions";

export default function AppTable() {
  const [rowData, setRowData] = useState([]);
  const [componentState, setComponentState] = useState(0); // 0 - normal view, 1 - edit view, 2 - delete view, 3 - adding view

  useEffect(() => {
    const data = getLS("app-data");
    setRowData(data);
    console.log(data)
  }, []);

  const headers = [
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'group',
      header: 'Group',
    },
    {
      key: 'balance',
      header: 'Balance'
    },
    {
      key: 'isActive',
      header: 'Status'
    },
    {
      key: 'note',
      header: 'Note'
    }
  ];

  const addUser = () => {

  };
  const editUser = () => {
    
  };
  const deleteUser = () => {

  };


  return (
    <DataTable rows={rowData} headers={headers}>
  {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
    <Table {...getTableProps()}>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableHeader {...getHeaderProps({ header })}>
              {header.header}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow {...getRowProps({ row })}>
            {row.cells.map((cell) => (
              <TableCell key={cell.id}>{cell.value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )}
</DataTable>
  );

  // switch(componentState) {
  //   case 0: // 0 - normal view
  //     return rowData.map(({ id, name, balance, isActive }) => (
  //       <div key={id}>
  //         {name}, {balance}, {isActive}
  //       </div>
  //     ));
  //   // case 1: //1 - edit view


  // }

  // const jsx = rowData.map(({ id, name, balance, isActive }) => (
  //   <div key={id}>
  //     {name}, {balance}, {isActive}
  //   </div>
  // ));

  // return <div>{jsx}</div>;
}
