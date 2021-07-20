import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
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

const AppModal = ({
  modalOpen,
  setModalOpen,
  initialValues, 
  handleSubmit,
  userGroups,
  modalHeading,
  primaryButtonText,
  withoutInputs,
  danger,
  ...otherProps
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={withoutInputs ? null : validationSchema}
      onSubmit={(values, { resetForm }) => {
        setLoading(true);
        setTimeout(() => {
          handleSubmit(values); //submit action
          setLoading(false);
          resetForm();
          setModalOpen(false);
        }, 200);
      }}
    >
      {({ dirty, touched, isValid, handleReset, handleSubmit }) => (
        <Modal
          open={modalOpen}
          onRequestSubmit={handleSubmit}
          onRequestClose={() => {
            handleReset();
            setModalOpen(false);
          }}
          onSecondarySubmit={() => {
            handleReset();
            setModalOpen(false);
          }}
          modalHeading={modalHeading}
          primaryButtonText={primaryButtonText}
          secondaryButtonText="Cancel"
          preventCloseOnClickOutside={true}
          danger={danger}
          primaryButtonDisabled={withoutInputs === false && (isValid === false || dirty === false || touched === false)}
        >
          <Loading active={loading} />
          {!withoutInputs && <AppForm userGroups={userGroups} />}
        </Modal>
      )}
    </Formik>
  );
};

AppModal.defaultProps = {
  withoutInputs: false,
  userGroups: [],
  initialValues: {
    name: "",
    group: "",
    balance: "",
    status: "",
    note: "",
  },
  userId: null,
  primaryButtonText: "",
  modalHeading: "",
  danger: false,

};

AppModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  withoutInputs: PropTypes.bool,
  userGroups: PropTypes.array,
  initialValues: PropTypes.object,
  userId: PropTypes.string,
  primaryButtonText: PropTypes.string,
  modalHeading: PropTypes.string,
  danger: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};

export default AppModal;
