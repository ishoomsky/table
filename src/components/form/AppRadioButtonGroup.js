import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useFormikContext } from "formik";
import { RadioButtonGroup, RadioButton } from "carbon-components-react";
import { WarningFilled16 } from "@carbon/icons-react";

const AppRadioButtonGroup = ({ name, labelText, radioButtonValues }) => {
  const { values, errors, touched, setFieldValue } = useFormikContext();
  const radioButtons = radioButtonValues.map((radioButtonValue) => (
    <RadioButton key={radioButtonValue} labelText={radioButtonValue} value={radioButtonValue} name={radioButtonValue} />
  ));

  return (
    <>
      <RadioButtonGroupLabel>{labelText}</RadioButtonGroupLabel>
      <RadioButtonGroupContainer error={errors[name] && touched[name]}>
        <RadioButtonGroup
          onChange={(value) => {
            setFieldValue(name, value);
          }}
          valueSelected={values[name]}
          name={name}
        >
          {radioButtons}
        </RadioButtonGroup>

        {errors[name] && touched[name] && (
          <ErrorIconWrapper>
            <WarningFilled16 fill="#da1e28" />
          </ErrorIconWrapper>
        )}
        {errors[name] && touched[name] && <ErrorMessageWrapper>{errors[name]}</ErrorMessageWrapper>}
      </RadioButtonGroupContainer>
    </>
  );
};

const RadioButtonGroupContainer = styled.div`
  position: relative;
  padding: 7px 5px;
  margin-bottom: 25px;
  border: 2px solid transparent;
  background-color: #fff;
  border-bottom: 1px solid rgb(141, 141, 141);

  ${({ error }) => error && `border: 2px solid #da1e28;`}
`;

const RadioButtonGroupLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.34;
  letter-spacing: 0.32px;
  display: inline-block;
  margin-bottom: 0.5rem;
  color: #525252;
  font-weight: 400;
  line-height: 1rem;
  vertical-align: baseline;
`;

const ErrorIconWrapper = styled.div`
  position: absolute;
  right: 15px;
  top: 10px;
`;

const ErrorMessageWrapper = styled.div`
  position: absolute;
  bottom: -23px;
  color: #da1e28;
  font-family: "IBM Plex Sans", "Helvetica Neue", Arial;
  font-size: 12px;
`;

AppRadioButtonGroup.defaultProps = {
  labelText: "",
};

AppRadioButtonGroup.propTypes = {
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  radioButtonValues: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default AppRadioButtonGroup;
