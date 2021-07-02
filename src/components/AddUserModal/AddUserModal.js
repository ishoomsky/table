import React, { useState } from "react";
import PropTypes from "prop-types";
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

export default function AddUserModal({
  isOpen,
  handleAddUser,
  setViewState,
  userGroups,
}) {
  const [isLoading, setIsLoading] = useState(false); //0 - normal view, 1 - loading view
  const [name, setName] = useState("");
  const [group, setGroup] = useState("placeholder-item");
  const [balance, setBalance] = useState(0);
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");

  const resetModalForm = () => {
    setName("");
    setGroup("placeholder-item");
    setBalance(0);
    setStatus("");
    setNote("");
  };

  const handleSubmit = () => {
    const newUser = {
      id: generateRandomId(),
      name: name,
      group: group,
      balance: balance,
      status: status === "radio-1" ? true : false,
      note: note,
    };

    setIsLoading(true);
    setTimeout(() => {
      handleAddUser(newUser);
      setIsLoading(false);
      resetModalForm();
      setViewState(0);
    }, 200);
  };

  const handleCancel = () => {
    console.log("handleCancel");
    setTimeout(() => {
      resetModalForm();
    }, 300);
    setViewState(0);
  };

  return (
    <Modal
      modalHeading={"Add user"}
      primaryButtonText={"Apply and add"}
      secondaryButtonText={"Cancel"}
      open={isOpen}
      onRequestClose={handleCancel}
      onRequestSubmit={handleSubmit}
      onSecondarySubmit={handleCancel}
    >
      <Loading active={isLoading} />
      <Form>
        <Loading active={false} />
        <TextInput
          onChange={(e) => setName(e.target.value)}
          value={name}
          id="user-name"
          labelText="Enter name"
          placeholder="John Doe"
          style={{ marginBottom: "1rem" }}
          data-modal-primary-focus
          autoComplete={"off"}
        />

        <Select
          onChange={(e) => setGroup(e.target.value)}
          value={group}
          id="user-group"
          labelText="Choose an group"
          style={{ marginBottom: "1rem" }}
          autoComplete={"off"}
        >
          <SelectItem
            disabled
            hidden
            value="placeholder-item"
            text="Choose an group"
          />
          {userGroups?.map((group) => (
            <SelectItem key={group} value={group} text={group} />
          ))}
        </Select>

        <TextInput
          onChange={(e) => setBalance(e.target.value)}
          value={balance}
          id="user-balance"
          labelText="Enter balance, BYN"
          placeholder="0"
          autoComplete={"off"}
        />
        <FormGroup legendText="Choose user's status">
          <RadioButtonGroup
            onChange={(value) => setStatus(value)}
            valueSelected={status}
            name="user-status"
          >
            <RadioButton labelText="Active" value="radio-1" name="radio-1" />
            <RadioButton
              labelText="Not active"
              value="radio-2"
              name="radio-2"
            />
          </RadioButtonGroup>
        </FormGroup>

        <TextArea
          onChange={(e) => setNote(e.target.value)}
          value={note}
          labelText={"Note"}
          rows={2}
          autoComplete={"off"}
        />
      </Form>
    </Modal>
  );
}

AddUserModal.propTypes = {
  open: PropTypes.bool,
  userGroups: PropTypes.array,
  handleAddUser: PropTypes.func,
  setViewState: PropTypes.func,
};
