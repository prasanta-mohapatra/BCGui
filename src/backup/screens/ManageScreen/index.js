import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function ManageScreen() {
  const { data } = useContext(UserContext);
  console.log(data, "logged");

  return (
    <div>
      <h1>manageScreen</h1>
    </div>
  );
}

export default ManageScreen;
