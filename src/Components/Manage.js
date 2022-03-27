import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Table, Modal } from "react-bootstrap";
import axios from "axios";
import { Customer, Policy } from "./Filter";
import {
  MdFilterList,
  MdModeEditOutline,
  MdRemoveRedEye,
  MdDone,
} from "react-icons/md";

const ManageFilter = ({ filterData }) => {
  const [customer, setCustomer] = useState("");
  const [policy, setPolicy] = useState("");
  return (
    <Row style={{ padding: "1rem" }}>
      <Col xs={5} md={4} lg={3}>
        <Customer
          onChange={(e) => setCustomer(e.target.value)}
          value={customer}
        />
      </Col>
      <Col xs={4} md={4} lg={3}>
        <Policy onChange={(e) => setPolicy(e.target.value)} value={policy} />
      </Col>
      <Col xs={3} md={4} lg={3}>
        <Button
          onClick={() =>
            filterData(
              `?customer=${customer || "All"}&policy=${policy || "All"}`
            )
          }
        >
          <MdFilterList />
          &nbsp;Filter
        </Button>
      </Col>
    </Row>
  );
};

const Information = ({ info }) => {
  return (
    <div style={{ padding: "1rem" }}>
      {info &&
        info.map((item) => (
          <span key={item.key}>
            <Button variant={item.color}></Button>
            &nbsp;{item.name}&nbsp;
          </span>
        ))}
    </div>
  );
};
function MyAction(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
const ManageData = ({ loading, data, info, offset }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [localData, setLocalData] = React.useState({});

  const editData = (e) => {
    setLocalData(e);
    setModalShow(true);
  };
  const viewData = (e) => {
    setLocalData(e);
    setModalShow(true);
  };
  return (
    <>
      <Table striped responsive size="sm">
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>Policy ID</th>
            <th>Customer ID</th>
            <th>Insurance</th>
            <th>DOP</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{offset + index + 1}</td>
                <td>{item.policy_id}</td>
                <td>{item.customer_id}</td>
                <td>
                  {info &&
                    info.map((it) =>
                      item[it.id] ? (
                        <Button key={it.key} variant={it.color} size="sm">
                          <MdDone />
                        </Button>
                      ) : (
                        ""
                      )
                    )}
                </td>
                <td>{item.date_of_purchase}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => editData(item)}
                  >
                    <MdModeEditOutline />
                  </Button>
                  &nbsp;
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => viewData(item)}
                  >
                    <MdRemoveRedEye />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <MyAction
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={localData}
      />
    </>
  );
};
const Paginate = () => {
  return (
    <Row style={{ display: "flex", justifyContent: "flex-end" }}>
      <Col xs={2} md={2} lg={1}>
        <Button variant="primary">Prev</Button>
      </Col>
      <Col xs={2} md={2} lg={1}>
        <Button variant="info">Next</Button>
      </Col>
    </Row>
  );
};

const Manage = (props) => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [ret, setRet] = useState("?customer=All&policy=All");
  const info = [
    {
      color: "primary",
      name: "Body Injury",
      key: "a",
      id: "body_injury_liability",
    },
    {
      color: "danger",
      name: "Collision",
      key: "b",
      id: "collision_liability",
    },
    {
      color: "secondary",
      name: "Personal Injury",
      key: "c",
      id: "personal_injury_liability",
    },
    {
      color: "warning",
      name: "Property Injury",
      key: "d",
      id: "property_injury_liability",
    },
    {
      color: "info",
      name: "Comprehensive",
      key: "e",
      id: "comprehensive_liability",
    },
  ];
  const setFilterData = (dt) => setRet(dt);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/allpolicydata/${offset}${ret}`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, [ret]);
  return (
    <Container fluid>
      <ManageFilter filterData={setFilterData} />
      <Information info={info} />
      <ManageData data={data} info={info} offset={offset} />
      <Paginate />
    </Container>
  );
};

export default Manage;
