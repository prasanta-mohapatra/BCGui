import React, { useState, useEffect } from "react";
import {
  Form,
  Container,
  Button,
  Row,
  Col,
  Table,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { Customer, Policy } from "./Filter";
import {
  MdFilterList,
  MdModeEditOutline,
  MdRemoveRedEye,
  MdDone,
  MdDangerous,
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

const EditData = ({ data, onHide }) => {
  const [fuel, setFuel] = useState(data.fuel_type);
  const [premium, setPremium] = useState(data.premium);
  const [vehicle, setVehicle] = useState(data.vehicle_segment);
  const [bodyLiability, setBodyLiability] = useState(
    data.body_injury_liability
  );
  const [collisionLiability, setCollisionLiability] = useState(
    data.collision_liability
  );
  const [personalLiability, setPersonalLiability] = useState(
    data.personal_injury_liability
  );
  const [propertylLiability, setPropertylLiability] = useState(
    data.property_injury_liability
  );
  const [comprehensivelLiability, setComprehensivelLiability] = useState(
    data.comprehensive_liability
  );
  const handleFormSumbit = (e) => {
    e.preventDefault();
    let dtt = {
      fuel: fuel,
      premium: premium,
      vehicle: vehicle,
      bodyLiability: bodyLiability,
      collisionLiability: collisionLiability,
      personalLiability: personalLiability,
      propertylLiability: propertylLiability,
      comprehensivelLiability: comprehensivelLiability,
    };
    axios
      .patch(`http://127.0.0.1:8000/allpolicydata/${data.policy_id}`, {
        previous: data,
        new: dtt,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Data Saved Successfully");
          onHide();
        } else {
          alert(response.data);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <Form onSubmit={handleFormSumbit}>
      <Row>
        <Col sm={4} md={2} lg={2}>
          Premium Amount:
        </Col>
        <Col sm={8} md={4} lg={4}>
          <Form.Control
            variant="text"
            value={premium}
            onChange={(e) => setPremium(e.target.value)}
            placeholder="Enter Policy Amount"
          />
        </Col>
        <Col sm={4} md={2} lg={2}>
          Fuel Type:
        </Col>
        <Col sm={8} md={4} lg={4}>
          <Form.Select value={fuel} onChange={(e) => setFuel(e.target.value)}>
            <option>Select Fuel type</option>
            <option value="CNG">CNG</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
          </Form.Select>
        </Col>
        <Col sm={4} md={2} lg={2}>
          Vehicle Segment:
        </Col>
        <Col sm={8} md={4} lg={4}>
          <Form.Select
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
          >
            <option>Select Vehicle Segment</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </Form.Select>
        </Col>
        <Col sm={4} md={2} lg={2}>
          Liability:
        </Col>
        <Col sm={8} md={4} lg={4}>
          <Form.Check
            variant="checkbox"
            checked={bodyLiability}
            label="Body Injury"
            onChange={(e) => setBodyLiability(!bodyLiability)}
          />
          <Form.Check
            variant="checkbox"
            checked={collisionLiability}
            label="Collision"
            onChange={(e) => setCollisionLiability(!collisionLiability)}
          />
          <Form.Check
            variant="checkbox"
            checked={personalLiability}
            label="Personal"
            onChange={(e) => setPersonalLiability(!personalLiability)}
          />
          <Form.Check
            variant="checkbox"
            checked={propertylLiability}
            label="Property"
            onChange={(e) => setPropertylLiability(!propertylLiability)}
          />
          <Form.Check
            variant="checkbox"
            checked={comprehensivelLiability}
            label="Comprehensive"
            onChange={(e) =>
              setComprehensivelLiability(!comprehensivelLiability)
            }
          />
        </Col>
        <Col sm={12} md={12} lg={12}>
          <Button type="submit" variant="success" style={{ float: "right" }}>
            SAVE
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
const ViewData = ({ data, onHide }) => {
  return (
    <Form>
      <Row>
        <Col sm={4} md={2} lg={2}>
          Premium Amount:
        </Col>
        <Col sm={8} md={4} lg={4}>
          {data.premium}
        </Col>
        <Col sm={4} md={2} lg={2}>
          Fuel Type:
        </Col>
        <Col sm={8} md={4} lg={4}>
          {data.fuel_type}
        </Col>
        <Col sm={4} md={2} lg={2}>
          Vehicle Segment:
        </Col>
        <Col sm={8} md={4} lg={4}>
          {data.vehicle_segment}
        </Col>
        <Col sm={4} md={2} lg={2}>
          Liability:
        </Col>
        <Col sm={8} md={4} lg={4}>
          Body Injury :
          {data.body_injury_liability ? <MdDone /> : <MdDangerous />}
          <br /> Collision :
          {data.collision_liability ? <MdDone /> : <MdDangerous />}
          <br /> Personal :
          {data.personal_injury_liability ? <MdDone /> : <MdDangerous />}
          <br /> Property :
          {data.property_injury_liability ? <MdDone /> : <MdDangerous />}
          <br /> Comprehensive :
          {data.comprehensive_liability ? <MdDone /> : <MdDangerous />}
        </Col>
      </Row>
    </Form>
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
          {props.mod === "edit"
            ? `Edit Policy Data (Policy: ${props.data.policy_id})`
            : `Policy Data (Policy :${props.data.policy_id})`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Customer ID: {props.data.customer_id}</h6>
        <h6>Gender: {props.customer.gender}</h6>
        <h6>Income Group: {props.customer.income}</h6>
        <h6>Region: {props.customer.region}</h6>
        <h6>
          Marital Status:
          {props.customer.marital_status ? " Married" : " Unmarried"}
        </h6>
        <h6>Date of Purchase: {props.data.date_of_purchase}</h6>
        {props.mod === "edit" ? (
          <EditData data={props.data} onHide={props.onHide} />
        ) : (
          <ViewData data={props.data} onHide={props.onHide} />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
const ManageData = ({ data, info, offset, modalOp }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [localData, setLocalData] = React.useState({});
  const [forModal, setForModal] = React.useState("edit");
  const [customer, setCustomer] = useState({});

  const editData = (e, tp) => {
    axios
      .get(`http://127.0.0.1:8000/customer/${e.customer_id}`)
      .then((response) => setCustomer(response.data[0]))
      .catch((error) => console.log(error));
    setLocalData(e);
    setForModal(tp);
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
                    onClick={() => editData(item, "edit")}
                  >
                    <MdModeEditOutline />
                  </Button>
                  &nbsp;
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => editData(item, "view")}
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
        onHide={() => {
          setModalShow(false);
          modalOp();
        }}
        data={localData}
        mod={forModal}
        customer={customer}
      />
    </>
  );
};
const Paginate = ({ changeOffset, offset }) => {
  return (
    <Row style={{ display: "flex", justifyContent: "flex-end" }}>
      {offset ? (
        <Col xs={2} md={2} lg={1}>
          <Button variant="primary" onClick={() => changeOffset(-10)}>
            Prev
          </Button>
        </Col>
      ) : (
        ""
      )}
      <Col xs={2} md={2} lg={1}>
        <Button variant="info" onClick={() => changeOffset(10)}>
          Next
        </Button>
      </Col>
    </Row>
  );
};

const Manage = (props) => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [ret, setRet] = useState("?customer=All&policy=All");
  const [isOp, setIsOp] = useState(false);
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
  const setFilterData = (dt) => {
    setRet(dt);
    setOffset(0);
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/allpolicydata/${offset}${ret}`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, [ret, offset, isOp]);
  return (
    <Container fluid>
      <ManageFilter filterData={setFilterData} />
      <Information info={info} />
      <ManageData
        data={data}
        info={info}
        offset={offset}
        modalOp={() => setIsOp(!isOp)}
      />
      <Paginate changeOffset={(i) => setOffset(offset + i)} offset={offset} />
    </Container>
  );
};

export default Manage;
