import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Modal,
  Form,
  FormGroup,
  TextInput,
  Select,
  SelectItem,
  RadioButtonGroup,
  RadioButton,
  TextArea,
  Loading,
} from "carbon-components-react";

import { generateRandomId } from "../../functions/generateRandomId";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter user's name").label("name"),
  group: Yup.string().required("Please choose user's group").label("group"),
  balance: Yup.number()
    .typeError("Please enter a number value")
    .required("Please enter user's balance")
    .label("balance"),
  status: Yup.string().required("Please enter user's status").label("status"),
  note: Yup.string().label("note"),
});

export default function EditUserModal({
  modalOpen,
  setModalOpen,
  handleEditUser,
  userGroups,
  setNotification,
  currentUser,
}) {
  const [modalLoading, setModalLoading] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);

  const {
    id: userId,
    name: userName,
    group: userGroup,
    balance: userBalance,
    status: userStatus,
    note: userNote,
  } = currentUser;

  const formik = useFormik({
    initialValues: {
      name: userName,
      group: userGroup,
      balance: userBalance,
      status: userStatus ? "radio-1" : "radio-2",
      note: userNote,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    let cleanupFunction = false;
    formik.validateForm().then((errors) => {
      if (allFieldsValid) {
        if (
          (errors &&
            Object.keys(errors).length === 0 &&
            errors.constructor === Object) === false
        ) {
          if (!cleanupFunction) setAllFieldsValid(false);
        }
      }

      //resolving to errors object, and if it empty, change validateState to true
      if (
        errors &&
        Object.keys(errors).length === 0 &&
        errors.constructor === Object
      ) {
        if (!cleanupFunction) setAllFieldsValid(true);
        return;
      }
    });
    return () => {
      cleanupFunction = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values]);

  const resetModalForm = () => {
    formik.handleReset();
  };
  const handleSubmit = (values) => {
    const { name, group, balance, status, note } = values;
    const editedUser = {
      id: userId,
      name: name,
      group: group,
      balance: balance,
      status: status === "radio-1" ? true : false,
      note: note,
    };
    const notification = {
      kind: "info",
      title: `User ${name} was edited`,
      id: generateRandomId(),
    };
    setModalLoading(true);

    setTimeout(() => {
      handleEditUser(editedUser);
      setModalLoading(false);
      resetModalForm();
      setModalOpen(false);
      setNotification(notification);
    }, 200);
  };
  const handleCancel = () => {
    resetModalForm();
    setModalOpen(false);
  };

  const renderModal = modalOpen && (
    <Modal
      modalHeading={"Edit user"}
      primaryButtonText={"Apply changes"}
      secondaryButtonText={"Cancel"}
      open={modalOpen}
      onRequestClose={handleCancel}
      onRequestSubmit={formik.handleSubmit}
      onSecondarySubmit={handleCancel}
      primaryButtonDisabled={!allFieldsValid || !formik.dirty}
      preventCloseOnClickOutside={true}
    >
      <Loading active={modalLoading} />
      <Form>
        <div style={{ marginBottom: "15px" }}>
          <TextInput
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            name={"name"}
            invalid={!!formik.errors.name && !!formik.touched.name}
            invalidText={formik.errors.name}
            id="user-name"
            labelText="Enter name"
            placeholder="John Doe"
            autoComplete="off"
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <Select
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.group}
            name={"group"}
            invalid={!!formik.errors.group && !!formik.touched.group}
            invalidText={formik.errors.group}
            id="user-group"
            labelText="Choose an user's group"
            autoComplete={"off"}
          >
            <SelectItem disabled hidden value="" text="" />
            {userGroups?.map((group) => (
              <SelectItem key={group} value={group} text={group} />
            ))}
          </Select>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <TextInput
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.balance}
            name={"balance"}
            invalid={!!formik.errors.balance && !!formik.touched.balance}
            invalidText={formik.errors.balance}
            id="user-balance"
            labelText="Enter balance, BYN"
            placeholder="0"
            autoComplete={"off"}
          />
        </div>

        <div style={{ marginBottom: "5px" }}>
          <FormGroup legendText="Choose user's status">
            <div
              style={
                formik.errors.status && !!formik.touched.status
                  ? {
                      position: "relative",
                      padding: "5px 0 10px 0",
                      border: "2px solid #da1e28",
                    }
                  : {
                      position: "relative",
                      padding: "5px 0 10px 0",
                      border: "2px solid transparent",
                    }
              }
            >
              <RadioButtonGroup
                onChange={(value) => {
                  formik.setFieldValue("status", value);
                }}
                valueSelected={formik.values.status}
                name="status"
              >
                <RadioButton
                  labelText="Active"
                  value="radio-1"
                  name="radio-1"
                />
                <RadioButton
                  labelText="Not active"
                  value="radio-2"
                  name="radio-2"
                />
              </RadioButtonGroup>

              {/* error icon */}
              {!!formik.errors.status && !!formik.touched.status && (
                <div
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "13px",
                  }}
                >
                  <svg
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#da1e28"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M8,1C4.2,1,1,4.2,1,8s3.2,7,7,7s7-3.1,7-7S11.9,1,8,1z M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2	c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z"></path>
                    <path
                      d="M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8	c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z"
                      data-icon-path="inner-path"
                      opacity="0"
                    ></path>
                  </svg>
                </div>
              )}
              {/*error message*/}
              {!!formik.errors.status && !!formik.touched.status && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-23px",
                    color: "#da1e28",
                    fontFamily: '"IBM Plex Sans", "Helvetica Neue", Arial',
                    fontSize: "12px",
                  }}
                >
                  {formik.errors["status"]}
                </div>
              )}
            </div>
          </FormGroup>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <TextArea
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.note}
            name={"note"}
            // invalid={!!formik.errors.note && !!formik.touched.note}
            // invalidText={formik.errors.note}
            labelText={"Note"}
            rows={2}
            autoComplete={"off"}
          />
        </div>
      </Form>
    </Modal>
  );

  return renderModal;
}

EditUserModal.defaultProps = {
  userGroups: [],
};

EditUserModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  userGroups: PropTypes.array,
  handleEditUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};
