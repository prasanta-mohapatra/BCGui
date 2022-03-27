import React, { useState } from "react";
import { Container, Button, Row, Col, Table, Modal } from "react-bootstrap";
import { Customer, Policy, Input } from "./Filter";
import {
  MdFilterList,
  MdModeEditOutline,
  MdRemoveRedEye,
  MdDone,
} from "react-icons/md";
import { useEffect } from "react";

///SAMPLE DB DATA
import * as res from "../DB/data";
import fuzzySearch from "../fuzzySearch";

const ManageFilter = () => {
  const [customer, setCustomer] = useState("");
  const [policy, setPolicy] = useState("");

  const filterAPI = (customer, policy) => {
    if (customer || policy) {
    }
  };
  return (
    <Row style={{ padding: "1rem" }}>
      <Col xs={5} md={4} lg={3}>
        <input
          placeholder="Select Customer"
          onChange={(e) => setCustomer(e.target.value)}
          value={customer}
        />
      </Col>
      <Col xs={4} md={4} lg={3}>
        <input
          placeholder="Select Policy"
          value={policy}
          onChange={(e) => setPolicy(e.target.value)}
        />
      </Col>
      <Col xs={3} md={4} lg={3}>
        <Button
          onClick={() => {
            console.log(customer, policy, "Called");
          }}
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
const ManageData = ({ loading, data, info }) => {
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <h1>....loading.....</h1>
          ) : (
            <>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.slno}</td>
                    <td>{item.policy_id}</td>
                    <td>{item.customer_id}</td>
                    <td>
                      {info &&
                        info.map((it) => (
                          <Button key={it.key} variant={it.color} size="sm">
                            <MdDone />
                          </Button>
                        ))}
                    </td>
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
                ))
              ) : (
                <h1>No DATA FOUND</h1>
              )}
            </>
          )}
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

const Manage = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    ///====MAKE API calll here
    setTimeout(() => {
      ///don't need timeout when calling api
      setData(res.tableData);
      setInfo(res.info);
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <Container>
      <ManageFilter />
      <Information info={info} />
      <ManageData data={data} loading={loading} info={info} />
    </Container>
  );
};

export default Manage;
