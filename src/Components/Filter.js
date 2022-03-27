import React from "react";
import { Form } from "react-bootstrap";
import SelectSearch from "react-select-search";

const Zone = ({ list = [] }) => {
  return (
    <SelectSearch
      options={list}
      value="sv"
      name="language"
      placeholder="Choose your Zone"
    />
  );
};
const Customer = ({ list = [], debounce, onChange, filterOptions }) => {
  return (
    <SelectSearch
      options={list}
      value="sv"
      name="language"
      placeholder="Choose Customer"
      debounce={debounce}
      onChange={() => console.log("hi")}
      search
      emptyMessage={() => (
        <div style={{ textAlign: "center", fontSize: "0.8em" }}>
          Not found renderer
        </div>
      )}
      filterOptions={filterOptions}
    />
  );
};

const Policy = ({ list = [] }) => {
  return (
    <SelectSearch
      options={list}
      value="sv"
      name="language"
      placeholder="Choose your Policy"
    />
  );
};

const Input = (value = "", onChange, placeholder) => {
  return <input value={value} onChange={onChange} placeholder={placeholder} />;
};

export { Zone, Customer, Policy, Input };
