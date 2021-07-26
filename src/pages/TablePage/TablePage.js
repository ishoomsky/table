import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "carbon-components-react";

import { usersAsyncSet } from "../../store/actions/usersActions";
import AppTable from "../../components/AppTable";
import AppModal from "../../components/AppModal";
import AppModalWithForm from "../../components/AppModalWithForm";
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
  const [modalLoading, setModalLoading] = useState(false);
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

  const appTableProps = () => ({
    users: users,
    headers: headers,
    findAndSetCurrentUser: findAndSetCurrentUser,
    setEditModalOpen: setEditModalOpen,
    setDeleteModalOpen: setDeleteModalOpen,
    setAddModalOpen: setAddModalOpen,
  });
  const addModalProps = () => ({
    onSubmit: handleAddUser,
    modalOpen: addModalOpen,
    setModalOpen: setAddModalOpen,
    modalLoading: modalLoading,
    setModalLoading: setModalLoading,
    userGroups: userGroups,
    modalHeading: "Add user",
    primaryButtonText: "Apply and add",
  });
  const editModalProps = () => ({
    onSubmit: handleEditUser,
    modalOpen: editModalOpen,
    setModalOpen: setEditModalOpen,
    modalLoading: modalLoading,
    setModalLoading: setModalLoading,
    initialValues: currentUser,
    userGroups: userGroups,
    modalHeading: `Apply and edit ${currentUser.name}`,
    primaryButtonText: "Apply changes",
  });
  const deleteModalProps = () => ({
      onSubmit: handleDeleteUser,
      modalOpen: deleteModalOpen,
      setModalOpen: setDeleteModalOpen,
      modalLoading: modalLoading,
      setModalLoading: setModalLoading,
      modalHeading: `Are you sure you want to delete ${currentUser.name}`,
      primaryButtonText: "Delete user",
      danger: true,
  });
  const notificationProps = () => ({
    notification: notification,
    setNotification: setNotification,
  })

  if (isDataLoadError) return <AppErrorMessage />;

  return (
    <AppPage>
      <AppTable {...appTableProps()} />
      {!isDataLoaded && <Loading active />}
      {addModalOpen && <AppModalWithForm {...addModalProps()} />}
      {editModalOpen && <AppModalWithForm {...editModalProps()} />}
      {deleteModalOpen && <AppModal {...deleteModalProps()} />}
      {notification && <Notification {...notificationProps()} />}
    </AppPage>
  );
};

export default TablePage;
