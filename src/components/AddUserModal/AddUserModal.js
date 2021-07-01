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
} from "carbon-components-react";

export default function AddUserModal({
  isOpen,
  handleAddUser,
  setViewState,
  userGroups,
}) {
  const [componentViewState, setComponentViewState] = useState(0); //0 - normal view, loading view
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [balance, setBalance] = useState(0);
  const [status, setStatus] = useState(null);
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    console.log({
      name: name,
      group: group,
      balance: balance,
      status: status === "radio-1" ? true : false,
      note: note,
    });
  };

  const handleCancel = () => {
    console.log("handleCancel");
    setName("1123123123123");
  };

  return (
    <Modal
      modalHeading={"Add user"}
      primaryButtonText={"Apply and add"}
      secondaryButtonText={"Cancel"}
      open={isOpen}
      onRequestClose={handleCancel}
      onRequestSubmit={() => handleSubmit()}
      onSecondarySubmit={handleCancel}
    >
      <Form>
        <TextInput
          id="user-name"
          onChange={(e) => setName(e.target.value)}
          labelText="Enter name"
          defaultValue={name}
          placeholder="John Doe"
          // style={{ marginBottom: "1rem" }}
          data-modal-primary-focus
        />

        <Select
          id="user-group"
          onChange={(e) => setGroup(e.target.value)}
          labelText="Choose an group"
          defaultValue="placeholder-item"
          style={{ marginBottom: "1rem" }}
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
          id="user-balance"
          labelText="Enter balance, BYN"
          onChange={(e) => setBalance(e.target.value)}
          defaultValue={balance}
          placeholder="0"
        />
        <FormGroup legendText="Choose user's status">
          <RadioButtonGroup
            onChange={(value) => setStatus(value)}
            orientation={"horizontal"}
            name="user-status"
            defaultSelected={status}
          >
            <RadioButton labelText="Active" value={"radio-1"} id="radio-1" />
            <RadioButton
              labelText="Not active"
              value={"radio-2"}
              id="radio-2"
            />
          </RadioButtonGroup>
        </FormGroup>

        <TextArea
          labelText={"asdfasdf"}
          onChange={(e) => setNote(e.target.value)}
          value={note}
          rows={4}
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
