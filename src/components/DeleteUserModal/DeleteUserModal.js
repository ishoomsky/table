import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Loading } from "carbon-components-react";

import { generateRandomId } from "../../functions/generateRandomId";

export default function DeleteModal({
  modalOpen,
  setModalOpen,
  handleDeleteUser,
  setNotification,
  currentUser,
}) {
  const [modalLoading, setModalLoading] = useState(false);
  const notification = {
    kind: "warning",
    title: `User ${currentUser?.name} was deleted`,
    id: generateRandomId(),
  };

  const handleSubmit = (id) => {
    setModalLoading(true);
    setTimeout(() => {
      handleDeleteUser(id);
      setModalLoading(false);
      setModalOpen(false);
      setNotification(notification);
    }, 200);
  };

  const renderModal = (
    <Modal
      open={modalOpen}
      danger={true}
      modalHeading={`Are you sure you want to delete ${currentUser?.name}`}
      primaryButtonText={"Delete user"}
      secondaryButtonText={"Cancel"}
      onRequestSubmit={() => handleSubmit(currentUser?.id)}
      onSecondarySubmit={() => setModalOpen(false)}
      onRequestClose={() => setModalOpen(false)}
    >
      <Loading active={modalLoading} />
    </Modal>
  );

  return renderModal;
}

DeleteModal.defaultProps = {
  currentUser: {},
};

DeleteModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  handleDeleteUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};
