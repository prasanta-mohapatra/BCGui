import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserContext } from "./Context/UserContect";
import "bootstrap/dist/css/bootstrap.min.css";
ReactDOM.render(
  <React.StrictMode>
    <UserContext.Provider value={"idea"}>
      <App
        style={{ maxHeight: "100vh", maxWidth: "100vw", overflow: "hidden" }}
      />
    </UserContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
