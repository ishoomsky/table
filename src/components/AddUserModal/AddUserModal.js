import React, { useState } from "react";
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
    .required("Please enter user's balance")
    .label("balance"),
  status: Yup.string().required("Please enter user's status").label("status"),
  note: Yup.string().label("note"),
});

export default function AddUserModal({
  isModalOpen,
  handleAddUser,
  setModalOpen,
  userGroups,
}) {
  const formik = useFormik({
    initialValues: {
      name: "",
      group: "",
      balance: "",
      status: "",
      note: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: validationSchema,
  });

  const [isLoading, setIsLoading] = useState(false);

  const resetModalForm = () => {
    formik.handleReset();
  };

  const handleSubmit = () => {
    const formikValues = formik.handleSubmit();
    // const newUser = {
    //   id: generateRandomId(),
    //   name: name,
    //   group: group,
    //   balance: balance,
    //   status: status === "radio-1" ? true : false,
    //   note: note,
    // };
    // setIsLoading(true);
    // setTimeout(() => {
    //   handleAddUser(newUser);
    //   setIsLoading(false);
    //   resetModalForm();
    //   setModalOpen(false);
    // }, 200);
  };

  const handleCancel = () => {
    console.log("handleCancel");
    resetModalForm();
    setModalOpen(false);
  };

  const modal = isModalOpen && (
    <Modal
      modalHeading={"Add user"}
      primaryButtonText={"Apply and add"}
      secondaryButtonText={"Cancel"}
      open={isModalOpen}
      onRequestClose={handleCancel}
      onRequestSubmit={handleSubmit}
      onSecondarySubmit={handleCancel}
    >
      <Loading active={isLoading} />
      <Form>
        <div style={{ marginBottom: "15px" }}>
          {console.log(formik.touched)}
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
            autoComplete={"off"}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <Select
            onChange={formik.handleChange}
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

        <div style={{ marginBottom: "15px" }}>
          <FormGroup legendText="Choose user's status">
            <div style={{ padding: "5px", border: "2px solid #da1e28" }}>
              <RadioButtonGroup
                onChange={(value) => {
                  formik.setFieldValue("status", value);
                }}
                valueSelected={formik.values.status}
                name="status"
              >
                <RadioButton labelText="Active" value="Active" name="radio-1" />
                <RadioButton
                  labelText="Not active"
                  value="Not active"
                  name="radio-2"
                />
              </RadioButtonGroup>
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

  return modal;
}

AddUserModal.defaultProps = {
  userGroups: [],
};

AddUserModal.propTypes = {
  open: PropTypes.bool,
  userGroups: PropTypes.array,
  handleAddUser: PropTypes.func,
  setModalOpen: PropTypes.func,
};
