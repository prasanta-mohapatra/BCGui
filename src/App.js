import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Manage from "./Components/Manage";
import Header from "./Components/Header";
import { Container } from "react-bootstrap";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container fluid>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/manage" element={<Manage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
