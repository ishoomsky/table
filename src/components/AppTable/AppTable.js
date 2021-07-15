import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  TableToolbar,
  TableToolbarContent,
  Button,
  Loading,
} from "carbon-components-react";
import { Edit16, Delete16 } from "@carbon/icons-react";

import { usersAsyncSet } from "../../store/actions/usersActions";
import AddUserModal from "../AddUserModal";
import EditUserModal from "../EditUserModal";
import DeleteUserModal from "../DeleteUserModal";
import Notification from "../Notification";

const AppTable = () => {
  const dispatch = useDispatch();
  const {
    users,
    loaded: usersLoaded,
    error: usersError,
  } = useSelector((state) => state.users);

  const {
    userGroups,
    loaded: userGroupsLoaded,
    error: userGroupsError,
  } = useSelector((state) => state.userGroups);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  const [notification, setNotification] = useState(null);

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

  const isDataLoaded = usersLoaded && userGroupsLoaded;
  const isDataLoadError = usersError || userGroupsError;

  const handleAddUser = (newUser) => {
    const newUsers = [...users, newUser];
    dispatch(usersAsyncSet(newUsers));
  };

  const handleEditUser = (currentUser) => {
    const newUsers = [...users];
    const indexUpdatedUser = newUsers.findIndex(
      (user) => user.id === currentUser.id
    );

    newUsers.splice(indexUpdatedUser, 1, currentUser);
    dispatch(usersAsyncSet(newUsers));
  };

  const handleDeleteUser = (currentUserId) => {
    const newUsers = [...users];
    const indexDeletedUser = newUsers.findIndex(
      (user) => user.id === currentUserId
    );
    newUsers.splice(indexDeletedUser, 1);
    dispatch(usersAsyncSet(newUsers));
  };

  const errorMessage = isDataLoadError && (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <h1 style={{ color: "red" }}>Sorry, the service is unavailable</h1>
    </div>
  );

  const tableHeaders = (headers) =>
    headers?.map(({ header }) => (
      <TableHeader key={header}>{header}</TableHeader>
    ));

  const tableCells = (row) => (
    <>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.group}</TableCell>

      <TableCell>{row.balance} BYN</TableCell>

      <TableCell
        style={{
          color: row.status ? "green" : "maroon",
        }}
      >
        {row.status ? "Active" : "Not active"}
      </TableCell>

      <TableCell>{row.note}</TableCell>

      <TableCell
        style={{
          display: "flex",
          gap: "5px",
        }}
      >
        <Button
          renderIcon={Edit16}
          iconDescription="Edit"
          hasIconOnly
          onClick={() => {
            const currentUser = users.filter(({ id }) => id === row.id)[0];
            setCurrentUser(currentUser);
            setEditModalOpen(true);
          }}
        />
        <Button
          renderIcon={Delete16}
          iconDescription="Delete"
          hasIconOnly
          onClick={() => {
            const currentUser = users.filter(({ id }) => id === row.id)[0];
            setCurrentUser(currentUser);
            setDeleteModalOpen(true);
          }}
        />
      </TableCell>
    </>
  );

  const tableRows = (rows) =>
    rows?.map((row) => <TableRow key={row.id}>{tableCells(row)}</TableRow>);

  const renderDataTable = (users, headers) => {
    console.log("RENDER TABLE");
    return (
      <DataTable rows={users} headers={headers}>
        {() => (
          <TableContainer>
            <TableToolbar>
              <TableToolbarContent>
                <Button onClick={() => setAddModalOpen(true)}>Add user</Button>
              </TableToolbarContent>
            </TableToolbar>
            <Table>
              <TableHead>
                <TableRow>{tableHeaders(headers)}</TableRow>
              </TableHead>
              <TableBody>{tableRows(users)}</TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
    );
  };
  const memoized = React.useMemo(
    () => renderDataTable(users, headers),
    [users]
  );

  const renderNotification = notification && (
    <Notification
      notification={notification}
      setNotification={setNotification}
    />
  );

  const renderAddUserModal = addModalOpen && (
    <AddUserModal
      modalOpen={addModalOpen}
      setModalOpen={setAddModalOpen}
      handleAddUser={handleAddUser}
      userGroups={userGroups}
      setNotification={setNotification}
    />
  );

  const renderEditModalOpen = editModalOpen && (
    <EditUserModal
      currentUser={currentUser}
      modalOpen={editModalOpen}
      setModalOpen={setEditModalOpen}
      handleEditUser={handleEditUser}
      userGroups={userGroups}
      setNotification={setNotification}
    />
  );

  const renderDeleteModalOpen = deleteModalOpen && (
    <DeleteUserModal
      modalOpen={deleteModalOpen}
      setModalOpen={setDeleteModalOpen}
      setNotification={setNotification}
      currentUser={currentUser}
      handleDeleteUser={handleDeleteUser}
    />
  );

  const renderModals = () => {
    console.log("render modals");
    return (
      <>
        {renderNotification}
        {renderAddUserModal}
        {renderEditModalOpen}
        {renderDeleteModalOpen}
      </>
    );
  };

  if (isDataLoadError) return <Grid>{errorMessage}</Grid>;

  return (
    <Grid>
      <Loading active={!isDataLoaded} />
      {renderModals()}
      {memoized}
      {/* {renderDataTable(users, headers)} */}
    </Grid>
  );
};

export default AppTable;
