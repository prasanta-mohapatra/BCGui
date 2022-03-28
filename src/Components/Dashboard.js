import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Zone } from "./Filter";
import axios from "axios";
import Chart from "./Chart";
const Dashboard = (props) => {
  const [region, setRegion] = useState("");
  const [report, setReport] = useState([]);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/analytics/${region}`)
      .then((response) => setReport(response.data))
      .catch((error) => console.log(error));
  }, [region]);

  return (
    <Container>
      <Row style={{ padding: "1rem" }}>
        <Col xs={6} md={4} lg={3}>
          <Zone onChange={(e) => setRegion(e.target.value)} value={region} />
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Chart data={report} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
