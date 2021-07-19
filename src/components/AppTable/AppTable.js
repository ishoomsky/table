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

import styled from "styled-components";
import { Edit16, Delete16 } from "@carbon/icons-react";

import { usersAsyncSet } from "../../store/actions/usersActions";
import Notification from "../Notification";
import AppModal from "../AppModal";
import { generateRandomId } from "../../functions/generateRandomId";

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

const AppTable = () => {
  const dispatch = useDispatch();
  const { users, loaded: usersLoaded, error: usersError } = useSelector((state) => state.users);
  const { userGroups, loaded: userGroupsLoaded, error: userGroupsError } = useSelector((state) => state.userGroups);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const isDataLoaded = usersLoaded && userGroupsLoaded;
  const isDataLoadError = usersError || userGroupsError;

  const handleAddUser = (_newUser) => {
    const newUser = {..._newUser, id: generateRandomId()}
    const newUsers = [...users, newUser];
    dispatch(usersAsyncSet(newUsers));
    setNotification({
      kind: "success",
      title: `User ${newUser.name} was added`,
      id: generateRandomId(),
    });
  };

  const handleEditUser = (updatedUser) => {
    const newUsers = [...users];
    const indexUpdatedUser = newUsers.findIndex((user) => user.id === currentUser.id);
    newUsers.splice(indexUpdatedUser, 1, updatedUser);
    dispatch(usersAsyncSet(newUsers));
    showNotification({
      kind: "info",
      title: `User ${currentUser.name} was edited`,
      id: generateRandomId(),
    });
  };

  const handleDeleteUser = () => {
    const newUsers = [...users];
    const indexDeletedUser = newUsers.findIndex((user) => user.id === currentUser.id);
    newUsers.splice(indexDeletedUser, 1);
    dispatch(usersAsyncSet(newUsers));
    showNotification({
      kind: "error",
      title: `User ${currentUser.name} was deleted`,
      id: generateRandomId(),
    });
  };

  const findAndSetCurrentUser = (id) => {
    const currentUser = users.find((user) => user.id === id);
    setCurrentUser(currentUser);
  };

  const showNotification = (notifConfig) => {
    setNotification(notifConfig);
  }

  const renderErrorMessage = () => (
    <ErrorMessage>
      <h1>Sorry, the service is unavailable</h1>
    </ErrorMessage>
  );

  const tableHeaders = (headers) => headers?.map(({ header }) => <TableHeader key={header}>{header}</TableHeader>);

  const tableCells = (row) => (
    <>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.group}</TableCell>

      <TableCell>{row.balance} BYN</TableCell>

      <TableCell>{row.status === "Active" ? <ActiveValue>{row.status}</ActiveValue> : <InactiveValue>{row.status}</InactiveValue>}</TableCell>

      <TableCell>{row.note}</TableCell>

      <TableCell>
        <ControlsContainer>
          <Button
            renderIcon={Edit16}
            iconDescription="Edit"
            hasIconOnly
            onClick={() => {
              findAndSetCurrentUser(row.id);
              setEditModalOpen(true);
            }}
          />
          <Button
            renderIcon={Delete16}
            iconDescription="Delete"
            hasIconOnly
            onClick={() => {
              findAndSetCurrentUser(row.id);
              setDeleteModalOpen(true);
            }}
          />
        </ControlsContainer>
      </TableCell>
    </>
  );

  const tableRows = (rows) => rows?.map((row) => <TableRow key={row.id}>{tableCells(row)}</TableRow>);

  const renderDataTable = (users, headers) => {
    return (
      <DataTable rows={users} headers={headers}>
        {() => (
          <TableContainer>
            <TableToolbar>
              <TableToolbarContent>
                <Button onClick={startAddUser}>Add user</Button>
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
  // const memoized = React.useMemo(
  //   () => renderDataTable(users, headers),
  //   [users]
  // );
  
  const startAddUser = () => {
    setAddModalOpen(true);
  }

  const renderAddUserModal = () => (
    <AppModal
      modalOpen={addModalOpen}
      setModalOpen={setAddModalOpen}
      userGroups={userGroups}
      handleSubmit={handleAddUser}
      modalHeading="Add user"
      primaryButtonText="Apply and add"
    />
  );

  const renderEditUserModal = () => (
    <AppModal
      modalOpen={editModalOpen}
      setModalOpen={setEditModalOpen}
      initialValues={currentUser}
      userGroups={userGroups}
      handleSubmit={handleEditUser}
      modalHeading={`Apply and edit ${currentUser.name}`}
      primaryButtonText="Apply changes"
    />
  );

  const renderDeleteUserModal = () => (
    <AppModal
      withoutInputs
      danger
      modalOpen={deleteModalOpen}
      setModalOpen={setDeleteModalOpen}
      userGroups={userGroups}
      handleSubmit={handleDeleteUser}
      modalHeading={`Are you sure you want to delete ${currentUser.name}`}
      primaryButtonText="Delete user"
      danger
    />
  );

  const renderModals = () => {
    return (
      <>
        {addModalOpen && renderAddUserModal()}
        {editModalOpen && renderEditUserModal()}
        {deleteModalOpen && renderDeleteUserModal()}
      </>
    );
  };

  const renderNotification = () => {
    return (
      notification && (
        <NotificationContainer>
          <Notification notification={notification} setNotification={setNotification} />
        </NotificationContainer>
      )
    );
  }

  if (isDataLoadError) {
    return <Grid>{renderErrorMessage()}</Grid>;
  };
  
  return (
    <>
      <Grid>
        <Loading active={!isDataLoaded} />
        {renderModals()}
        {renderDataTable(users, headers)}
      </Grid>
      {renderNotification()}
    </>
  );
};

const NotificationContainer = styled.div`
  background-color: red;
  // height: 20px;
  position: fixed;
  width: 100%;
  top: 0;
`;
const ErrorMessage = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: maroon;
`;
const ActiveValue = styled.div`
  color: green;
`;
const InactiveValue = styled.div`
  color: maroon;
`;
const ControlsContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export default AppTable;