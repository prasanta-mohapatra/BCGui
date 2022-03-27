import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <Container style={{ padding: 0, margin: 0, minWidth: "100vw" }}>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand style={{ flex: 6 }}>BCG</Navbar.Brand>
          <Nav
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              flex: 4,
            }}
          >
            <Link to={"/"} className="text-light link">
              Dashboard
            </Link>
            <Link to={"/manage"} className="text-light link">
              Manage
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </Container>
  );
};

export default Header;
