import React from "react";
import PropTypes from "prop-types";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Modal, Loading } from "carbon-components-react";

import AppForm from "../AppForm";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter user's name").label("name"),
  group: Yup.string().required("Please choose user's group").label("group"),
  balance: Yup.number().typeError("Please enter a number value").required("Please enter user's balance").label("balance"),
  status: Yup.string().required("Please choose user's status").label("status"),
  note: Yup.string().label("note"),
});

const AppModal = (props) => {
  const { modalOpen, setModalOpen, modalLoading, userGroups, modalHeading, primaryButtonText, danger, handleSubmit, handleReset } = props;

  const handleClose = () => {
    handleReset();
    setModalOpen(false);
  };

  return (
    <Modal
      open={modalOpen}
      onRequestSubmit={handleSubmit}
      onRequestClose={() => {
        handleClose();
      }}
      onSecondarySubmit={() => {
        handleClose();
      }}
      modalHeading={modalHeading}
      primaryButtonText={primaryButtonText}
      secondaryButtonText="Cancel"
      preventCloseOnClickOutside={true}
      danger={danger}
      primaryButtonDisabled={!props.isValid || !props.dirty || !props.touched}
    >
      <Loading active={modalLoading} />
      <AppForm userGroups={userGroups} />
    </Modal>
  );
};

const WithFormik = withFormik({
  isValidating: false,
  validationSchema: validationSchema,
  handleSubmit: (values, { props, resetForm }) => {
    props.setModalLoading(true);
    setTimeout(() => {
      props.onSubmit(values); //submit action
      props.setModalLoading(false);
      resetForm();
      props.setModalOpen(false);
    }, 200);
  },
  mapPropsToValues: (props) => ({
    name: props.initialValues?.name || "",
    group: props.initialValues?.group || "",
    balance: props.initialValues?.balance || "",
    status: props.initialValues?.status || "",
    note: props.initialValues?.note || "",
    id: props.initialValues?.id || "",
  }),
})(AppModal);

export default WithFormik;

AppModal.defaultProps = {
  //useless, because we take props before proptypes.
  // initialValues: {
  //   name: "",
  //   group: "",
  //   balance: "",
  //   status: "",
  //   note: "",
  //   id: "",
  // },
  userGroups: [],
  modalLoading: false,
  primaryButtonText: "",
  modalHeading: "",
  danger: false,
};

AppModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  userGroups: PropTypes.array,
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  modalLoading: PropTypes.bool,
  setModalLoading: PropTypes.func.isRequired,
  primaryButtonText: PropTypes.string,
  modalHeading: PropTypes.string,
  danger: PropTypes.bool,
};
