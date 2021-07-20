import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Loading } from "carbon-components-react";

import { usersAsyncSet } from "../../store/actions/usersActions";
import AppTable from "../../components/AppTable";
import AppModal from "../../components/AppModal";
import Notification from "../../components/Notification";
import AppErrorMessage from "../../components/AppErrorMessage";
import AppPage from "../../components/AppPage";
import { generateRandomId } from "../../functions/utilities";

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

const TablePage = () => {
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
    const newUser = { ..._newUser, id: generateRandomId() };
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
  };

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
      handleSubmit={handleDeleteUser}
      modalHeading={`Are you sure you want to delete ${currentUser.name}`}
      primaryButtonText="Delete user"
    />
  );
  const renderLoader = isDataLoaded === false && <Loading active />;
  const renderModals = (
    <>
      {addModalOpen && renderAddUserModal()}
      {editModalOpen && renderEditUserModal()}
      {deleteModalOpen && renderDeleteUserModal()}
    </>
  );
  const renderNotification = notification && <Notification notification={notification} setNotification={setNotification} />;

  if (isDataLoadError) {
    return (
      <Grid>
        <AppErrorMessage />
      </Grid>
    );
  }

  return (
    <AppPage>
      <Grid>
        <AppTable
          users={users}
          headers={headers}
          findAndSetCurrentUser={findAndSetCurrentUser}
          setEditModalOpen={setEditModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          setAddModalOpen={setAddModalOpen}
        />
        {renderLoader}
        {renderModals}
      </Grid>
      {renderNotification}
    </AppPage>
  );
};

export default TablePage;
