import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import { TextArea } from "carbon-components-react";

const AppTextArea = ({ name, labelText, rows, autoComplete, isRequired }) => {
  const { values, errors, touched, setFieldValue, setFieldTouched } = useFormikContext();
  return (
    <TextArea
      onInput={(e) => setFieldValue(name, e.currentTarget.value)}
      onBlur={() => setFieldTouched("name")}
      value={values[name]}
      name={name}
      invalid={isRequired && errors[name] && touched[name]}
      invalidText={isRequired && errors[name]}
      labelText={labelText}
      rows={rows}
      autoComplete={autoComplete}
    />
  );
};

AppTextArea.defaultProps = {
  placeholder: "",
  row: 2,
  autoComplete: "off",
};

AppTextArea.propTypes = {
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  row: PropTypes.number,
  autoComplete: PropTypes.oneOf(["on", "off"]),
};

export default AppTextArea;
