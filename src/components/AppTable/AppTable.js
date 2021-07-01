import React, { useEffect, useState } from "react";
import { setLS, getLS } from "../../functions/localStorageFunctions";

import {
  Grid,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Checkbox,
  TableToolbar,
  TableToolbarContent,
  Button,
} from "carbon-components-react";

import AddUserModal from "../AddUserModal";

export default function AppTable() {
  const [rowData, setRowData] = useState([]);
  const [viewState, setViewState] = useState(0); // 0 - normal view, 1 - edit view, 2 - delete view, 3 - adding view
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    const data = getLS();
    setRowData(data);
    const groups = data.map(({ group }) => group);
    setUserGroups(groups);
  }, []);

  const headers = [
    {
      key: "name",
      header: "Name",
    },
    {
      key: "group",
      header: "Group",
    },
    {
      key: "balance",
      header: "Balance",
    },
    {
      key: "status",
      header: "Status",
    },
    {
      key: "note",
      header: "Note",
    },
  ];

  const handleAddUser = (newUser) => {
    const newRowData = [...rowData, newUser];
    setRowData(newRowData);
  };
  const handleEditUser = () => {};
  const handleDeleteUser = () => {};
  const handleChangeStatus = (id) => {
    const newRowData = [...rowData];

    const updatingIndex = newRowData.findIndex((row) => row.id === id);
    const updatingRow = newRowData[updatingIndex];

    const newStatus = !updatingRow.status;

    newRowData.splice(updatingIndex, 1, {
      ...updatingRow,
      status: newStatus,
    });

    setRowData(newRowData);
    setLS(newRowData);
  };
  const handleChangeGroup = () => {};

  return (
    <Grid>
      <AddUserModal
        isOpen={viewState === 3 && true}
        setViewState={setViewState}
        handleAddUser={handleAddUser}
        userGroups={userGroups}
      />
      <DataTable rows={rowData} headers={headers}>
        {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
          <TableContainer>
            <TableToolbar>
              <TableToolbarContent>
                <Button onClick={() => setViewState(3)}>Add user</Button>
              </TableToolbarContent>
            </TableToolbar>
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
                    {row.cells.map((cell) => {
                      if (cell.info.header === "status") {
                        return (
                          <TableCell
                            style={{
                              color: cell.value ? "green" : "maroon",
                            }}
                            key={cell.id}
                          >
                            {cell.value ? "Active" : "Not active"}
                          </TableCell>
                        );
                      }
                      if (cell.info.header === "balance") {
                        return (
                          <TableCell key={cell.id}>{cell.value} BYN</TableCell>
                        );
                      }
                      return <TableCell key={cell.id}>{cell.value}</TableCell>;
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
    </Grid>
  );
}
