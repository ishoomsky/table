import React, { useEffect, useState } from "react";
import { setLS, getLS } from "../../functions/localStorageFunctions";
import {
  Grid,
  Row,
  Column,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarContent,
  Button,
} from "carbon-components-react";
import { Edit16, Delete16 } from "@carbon/icons-react";

import AddUserModal from "../AddUserModal";
import Notification from "../Notification";

export default function AppTable() {
  const [users, setUsers] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [userGroups, setUserGroups] = useState([]);

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const data = getLS() || [];
    setUsers(data);

    const groups = new Set([]);
    data?.forEach(({ group }) => groups.add(group));
    setUserGroups([...groups]);
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
    {
      key: "controls",
      header: "",
    },
  ];

  const handleAddUser = (newUser) => {
    const newUsers = [...users, newUser];
    setUsers(newUsers);
    setLS(newUsers);
  };
  const handleEditUser = () => {};
  const handleDeleteUser = () => {};
  const handleChangeStatus = (id) => {
    const newUsers = [...users];

    const updatingIndex = newUsers.findIndex((row) => row.id === id);
    const updatingRow = newUsers[updatingIndex];

    const newStatus = !updatingRow.status;

    newUsers.splice(updatingIndex, 1, {
      ...updatingRow,
      status: newStatus,
    });

    setUsers(newUsers);
    setLS(newUsers);
  };
  const handleChangeGroup = () => {};

  const handleSetNotification = (value) => {
    if (value) {
      setNotification(value);
      setTimeout(() => {
        setNotification(null);
      }, 3000);
      return;
    }
    setNotification(null);
  };

  const dataTable = (
    <DataTable rows={users} headers={headers}>
      {({ rows, getRowProps }) => (
        <TableContainer>
          <TableToolbar>
            <TableToolbarContent>
              <Button onClick={() => setAddModalOpen(true)}>Add user</Button>
            </TableToolbarContent>
          </TableToolbar>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map(({ header }) => (
                  <TableHeader key={header}>{header}</TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow {...getRowProps({ row })}>
                  {row.cells.map((cell) => {
                    switch (cell.info.header) {
                      case "status":
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
                      case "balance":
                        return (
                          <TableCell key={cell.id}>{cell.value} BYN</TableCell>
                        );
                      case "controls":
                        return (
                          <TableCell
                            style={{
                              display: "flex",
                              gap: "5px",
                            }}
                            key={cell.id}
                          >
                            <Button
                              renderIcon={Edit16}
                              iconDescription="Edit"
                              hasIconOnly
                              onClick={() =>
                                console.log("edit click " + row.id)
                              }
                            />
                            <Button
                              renderIcon={Delete16}
                              iconDescription="Delete"
                              hasIconOnly
                              onClick={() => console.log("del click " + row.id)}
                            />
                          </TableCell>
                        );
                      default:
                        return (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        );
                    }
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  );

  return (
    <Grid>
      {notification && (
        <Notification
          notification={notification}
          setNotification={handleSetNotification}
        />
      )}
      <AddUserModal
        modalOpen={addModalOpen}
        setModalOpen={setAddModalOpen}
        handleAddUser={handleAddUser}
        userGroups={userGroups}
        setNotification={handleSetNotification}
      />
      {dataTable}
    </Grid>
  );
}
