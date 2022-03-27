import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Zone } from "./Filter";
const Dashboard = (props) => {
  return (
    <Container>
      <Row style={{ padding: "1rem" }}>
        <Col xs={6} md={4} lg={3}>
          <Zone />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
