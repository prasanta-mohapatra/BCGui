import React from "react";
import { Form } from "react-bootstrap";

const Zone = ({ list = ["East", "West", "North", "South"] }) => {
  return (
    <Form.Select name="zone" id="zone">
      <option value="">Select the Zone</option>
      {list &&
        list.map((item, index) => (
          <option key={index} value="{item}">
            {item}
          </option>
        ))}
    </Form.Select>
  );
};
const Customer = ({ onChange, value }) => {
  return (
    <Form.Control
      variant="text"
      id="customer"
      placeholder="enter customer id"
      value={value}
      onChange={onChange}
    />
  );
};

const Policy = ({ onChange, value }) => {
  return (
    <Form.Control
      variant="text"
      id="policy"
      placeholder="enter policy id"
      value={value}
      onChange={onChange}
    />
  );
};

export { Zone, Customer, Policy };
