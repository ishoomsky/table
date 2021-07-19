import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import { Select, SelectItem } from "carbon-components-react";

const AppSelectInput = ({ name, inputId, labelText, userGroups, isRequired }) => {
  const { values, errors, touched, setFieldValue, setFieldTouched } = useFormikContext();
  return (
    <Select
      onChange={(e) => setFieldValue(name, e.currentTarget.value)}
      onBlur={() => setFieldTouched(name)}
      value={values[name]}
      name={name}
      invalid={isRequired && errors[name] && touched[name]}
      invalidText={isRequired && errors[name]}
      id={inputId}
      labelText={labelText}
    >
      <SelectItem disabled hidden value="" text="" />
      {userGroups.map((group) => (
        <SelectItem key={group} value={group} text={group} />
      ))}
    </Select>
  );
};


AppSelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  userGroups: PropTypes.array.isRequired,
};

export default AppSelectInput;
