import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { useFormik } from "formik";
import * as Yup from "yup";

import { Modal, Form, FormGroup, TextInput, Select, SelectItem, 
  RadioButtonGroup, RadioButton, TextArea, Loading 
} from "carbon-components-react";


const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter user's name").label("name"),
  group: Yup.string().required("Please choose user's group").label("group"),
  balance: Yup.number().typeError("Please enter a number value").required("Please enter user's balance").label("balance"),
  status: Yup.string().required("Please enter user's status").label("status"),
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
  danger
}) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: withoutInputs ? null : validationSchema,

    onSubmit: (values) => {
      setLoading(true);
      setTimeout(() => {
        handleSubmit(values);
        setLoading(false);
        formik.handleReset();
        setModalOpen(false);
      }, 200);
    },
  });

  const handleCancel = () => {
    formik.handleReset();
    setModalOpen(false);
  };

  if (withoutInputs) {
    return (
      <>
        <Modal
          open={modalOpen}
          danger={danger}
          modalHeading={modalHeading}
          primaryButtonText={primaryButtonText}
          secondaryButtonText={"Cancel"}
          onRequestSubmit={formik.handleSubmit}
          onSecondarySubmit={handleCancel}
          onRequestClose={handleCancel}
        />
        <Loading active={loading} />
      </>
    );
  }

  return (
    <Modal
      open={modalOpen}
      onRequestSubmit={formik.handleSubmit}
      onRequestClose={handleCancel}
      onSecondarySubmit={handleCancel}
      modalHeading={modalHeading}
      primaryButtonText={primaryButtonText}
      secondaryButtonText={"Cancel"}
      preventCloseOnClickOutside={true}
      primaryButtonDisabled={formik.isValid === false || formik.dirty === false}
    >
      <Loading active={loading} />
      <Form>
        <FormItem>
          <TextInput
            onInput={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            name={"name"}
            invalid={formik.errors.name && formik.touched.name}
            invalidText={formik.errors.name}
            id="user-name"
            labelText="Enter name"
            placeholder="John Doe"
            autoComplete="off"
          />
        </FormItem>
        <FormItem>
          <Select
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.group}
            name="group"
            invalid={formik.errors.group && formik.touched.group}
            invalidText={formik.errors.group}
            id="user-group"
            labelText="Choose an user's group"
            autoComplete="off"
          >
            <SelectItem disabled hidden value="" text="" />
            {userGroups.map((group) => (
              <SelectItem key={group} value={group} text={group} />
            ))}
          </Select>
        </FormItem>
        <FormItem>
          <TextInput
            onInput={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.balance}
            name="balance"
            invalid={formik.errors.balance && formik.touched.balance}
            invalidText={formik.errors.balance}
            id="user-balance"
            labelText="Enter balance, BYN"
            placeholder="0"
            autoComplete="off"
          />
        </FormItem>
        <FormItem>
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
                <RadioButton labelText="Active" value="Active" name="Active" />
                <RadioButton labelText="Not active" value="Not active" name="Not active" />
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
        </FormItem>
        <FormItem>
          <TextArea
            onInput={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.note}
            name="note"
            labelText="Note"
            rows={2}
            autoComplete="off"
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

AppModal.defaultProps = {
  userId: null,
  initialValues: {
    name: "",
    group: "",
    balance: "",
    status: "",
    note: "",
  },
  userGroups: [],
};

AppModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  userId: PropTypes.string,
  setModalOpen: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  userGroups: PropTypes.array,
};

const FormItem = styled.div`
  margin-bottom: 15px;
`;

export default AppModal;
