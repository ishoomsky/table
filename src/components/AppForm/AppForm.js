import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Form } from "carbon-components-react";

import AppTextInput from "../form/AppTextInput";
import AppSelectInput from "../form/AppSelectInput";
import AppTextArea from "../form/AppTextArea"; 
import AppRadioButtonGroup from "../form/AppRadioButtonGroup";

const radioButtonsValues = ["Active", "Not active"];

const AppForm = ({ userGroups }) => {

  return (
      <Form className="app-form">
        <FormContainer>
          <AppTextInput name="name" inputId="user-name" labelText="Enter name" placeholder="John Doe" isRequired />
          <AppSelectInput name="group" inputId="user-group" labelText="Choose an user's group" userGroups={userGroups} isRequired />
          <AppTextInput name="balance" inputId="user-balance" labelText="Enter balance" placeholder="0" isRequired />
          <AppRadioButtonGroup name="status" labelText="Choose user's status" radioButtonValues={radioButtonsValues} />
          <AppTextArea name="note" inputId="user-note" labelText="Notes:" placeholder="0" isRequired />
        </FormContainer>
      </Form>
  );
};

AppForm.defaultProps = {
  userGroups: [],
};

AppForm.propTypes = {
  userGroups: PropTypes.array,
};

export default AppForm;

const FormContainer = styled.div`
  > * {
    margin-bottom: 15px;
  }
`;