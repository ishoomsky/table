import React from "react";
import PropTypes from "prop-types";
import { Modal, Loading } from "carbon-components-react";

const AppModal = (props) => {
  const { onSubmit, modalOpen, setModalOpen, modalLoading, setModalLoading, modalHeading, primaryButtonText, danger } = props;

  const handleSubmit = () => {
    setModalLoading(true);
    setTimeout(() => {
      onSubmit();
      setModalLoading(false);
      setModalOpen(false);
    }, 200);
  };

  return (
    <Modal
      open={modalOpen}
      onRequestSubmit={handleSubmit}
      onRequestClose={() => setModalOpen(false)}
      onSecondarySubmit={() => setModalOpen(false)}
      modalHeading={modalHeading}
      primaryButtonText={primaryButtonText}
      secondaryButtonText="Cancel"
      preventCloseOnClickOutside={true}
      danger={danger}
    >
      <Loading active={modalLoading} />
    </Modal>
  );
};


export default AppModal;

AppModal.defaultProps = {
  primaryButtonText: "",
  modalHeading: "",
  danger: false,
  modalLoading: false,
};

AppModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  modalLoading: PropTypes.bool,
  setModalLoading: PropTypes.func.isRequired,
  primaryButtonText: PropTypes.string,
  modalHeading: PropTypes.string,
  danger: PropTypes.bool,
};
