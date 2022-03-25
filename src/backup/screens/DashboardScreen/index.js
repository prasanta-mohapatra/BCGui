import React from "react";
import { Link } from "react-router-dom";

function DashboardScreen() {
  return (
    <div>
      <h1>dashboardScreen</h1>
      <Link to="/manage">
        <h1>Manage screen</h1>
      </Link>
    </div>
  );
}

export default DashboardScreen;
