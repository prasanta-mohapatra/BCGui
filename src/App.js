import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardScreen from "./screens/DashboardScreen";
import ManageScreen from "./screens/ManageScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardScreen />} />
        <Route path="/manage" element={<ManageScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
