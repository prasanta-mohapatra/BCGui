import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserContext } from "./context/UserContext";
const data = {
  data: [
    {
      name: "A",
    },
    {
      name: "B",
    },
    {
      name: "C",
    },
  ],
};
ReactDOM.render(
  <React.StrictMode>
    <UserContext.Provider value={data}>
      <App />
    </UserContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
