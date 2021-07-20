import React from 'react';
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import { TextInput } from "carbon-components-react";

const AppTextInput = ({ name, inputId, labelText, placeholder, autoComplete, isRequired }) => {
  const { values, errors, touched, setFieldValue, setFieldTouched } = useFormikContext();
  return (
    <TextInput
      onInput={(e) => setFieldValue(name, e.currentTarget.value)}
      onBlur={() => setFieldTouched(name)}
      value={values[name]}
      name={name}
      invalid={isRequired && errors[name] && touched[name]}
      invalidText={isRequired && errors[name]}
      id={inputId}
      labelText={labelText}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />
  );
};

AppTextInput.defaultProps = {
  placeholder: "",
  autoComplete: "off",
  labelText: "",
  isRequired: false,
};

AppTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.oneOf(["on", "off"]),
  isRequired: PropTypes.bool,
};

export default AppTextInput;