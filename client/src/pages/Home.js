import React, { useState } from "react";
import {
  Col,
  Row,
  Card,
  Button,
  ButtonGroup,
  Form,
  Image,
  InputGroup,
  ToggleButton,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import rupiahFormat from "rupiah-format";
import IconCalender from "../assets/icons/IconCalender.png";

const styles = {
  buttonType: {
    width: "100px",
    height: "50px",
    fontWeight: "500",
    fontSize: "18px",
    border: "none",
  },
  buttonProperty: {
    width: "55px",
    height: "40px",
    fontWeight: "700",
    fontSize: "18px",
    border: "none",
  },
};

const Home = () => {
  // Type of rent
  const [radioValue, setRadioValue] = useState("3");
  const rents = [
    { name: "Day", value: "1" },
    { name: "Month", value: "2" },
    { name: "Year", value: "3" },
  ];

  // Bedroom
  const [bedValue, setBedValue] = useState("3");
  const bedrooms = [
    { name: "1", value: "1" },
    { name: "2", value: "2" },
    { name: "3", value: "3" },
    { name: "4", value: "4" },
    { name: "5+", value: "5" },
  ];

  // Bathroom
  const [bathValue, setBathValue] = useState("2");
  const bathrooms = [
    { name: "1", value: "1" },
    { name: "2", value: "2" },
    { name: "3", value: "3" },
    { name: "4", value: "4" },
    { name: "5+", value: "5" },
  ];

  // Fetching data house
  let { data: houses } = useQuery("housesCache", async () => {
    const response = await API.get("/houses");
    return response.data.data;
  });
  return (
    <Row className="m-0">
      <Col md={5} lg={4} className="py-3">
        <div className="mb-4">
          <div
            className="mb-2"
            style={{ color: "#000000", fontSize: "24px", fontWeight: "800" }}
          >
            Type of Rent
          </div>
          <ButtonGroup className="d-flex justify-content-between gap-3">
            {rents.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={radioValue === radio.value ? "primary" : "light"}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                className="rounded d-flex justify-content-center align-items-center"
                style={styles.buttonType}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>
        <div className="mb-4">
          <div
            className="mb-2"
            style={{ color: "#000000", fontSize: "24px", fontWeight: "800" }}
          >
            Date
          </div>
          <InputGroup style={{ height: "50px" }}>
            <InputGroup.Text id="btnGroupAddon" className="bg-light border-0">
              <Image src={IconCalender} />
            </InputGroup.Text>
            <Form.Control
              type="date"
              aria-label="Input group example"
              aria-describedby="btnGroupAddon"
              className="bg-light"
              style={{ borderTop: "0", borderRight: "0", borderBottom: "0" }}
            />
          </InputGroup>
        </div>
        <div className="mb-4">
          <div
            className="mb-2"
            style={{ color: "#000000", fontSize: "24px", fontWeight: "800" }}
          >
            Property Room
          </div>
          <div className="mb-2">
            <div
              style={{ color: "#929292", fontSize: "14px", fontWeight: "500" }}
            >
              Bedroom
            </div>
            <ButtonGroup className="d-flex justify-content-between gap-3 mt-2">
              {bedrooms.map((bedroom, idx) => (
                <ToggleButton
                  key={idx}
                  id={`bedroom-${idx}`}
                  type="radio"
                  variant={bedValue === bedroom.value ? "primary" : "light"}
                  name="bedroom"
                  value={bedroom.value}
                  checked={bedValue === bedroom.value}
                  className="rounded d-flex justify-content-center align-items-center"
                  style={styles.buttonProperty}
                  onChange={(e) => setBedValue(e.currentTarget.value)}
                >
                  {bedroom.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>
          <div className="mb-2">
            <div
              style={{ color: "#929292", fontSize: "14px", fontWeight: "500" }}
            >
              Bathroom
            </div>
            <ButtonGroup className="d-flex justify-content-between gap-3 mt-2">
              {bathrooms.map((bathroom, idx) => (
                <ToggleButton
                  key={idx}
                  id={`bathroom-${idx}`}
                  type="radio"
                  variant={bathValue === bathroom.value ? "primary" : "light"}
                  name="bathroom"
                  value={bathroom.value}
                  checked={bathValue === bathroom.value}
                  className="rounded d-flex justify-content-center align-items-center"
                  style={styles.buttonProperty}
                  onChange={(e) => setBathValue(e.currentTarget.value)}
                >
                  {bathroom.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>
        </div>
        <div className="mb-4">
          <div
            className="mb-2"
            style={{ color: "#000000", fontSize: "24px", fontWeight: "800" }}
          >
            Amenities
          </div>
          <InputGroup className="d-flex justify-content-between">
            <Form.Label
              style={{ fontSize: "18px", fontWeight: "500", color: "#929292" }}
            >
              Furnished
            </Form.Label>
            <Form.Check type="checkbox" />
          </InputGroup>
          <InputGroup className="d-flex justify-content-between">
            <Form.Label
              style={{ fontSize: "18px", fontWeight: "500", color: "#929292" }}
            >
              Pet Allowed
            </Form.Label>
            <Form.Check type="checkbox" />
          </InputGroup>
          <InputGroup className="d-flex justify-content-between">
            <Form.Label
              style={{ fontSize: "18px", fontWeight: "500", color: "#929292" }}
            >
              Shared Accomodation
            </Form.Label>
            <Form.Check type="checkbox" />
          </InputGroup>
        </div>
        <div className="mb-5">
          <div
            className="mb-2"
            style={{ color: "#000000", fontSize: "24px", fontWeight: "800" }}
          >
            Budget
          </div>
          <Form.Group className="d-flex justify-content-between align-items-center mb-3">
            <Form.Label
              style={{ fontSize: "18px", fontWeight: "700", color: "#000000" }}
            >
              Less than IDR.
            </Form.Label>
            <Form.Control
              type="text"
              className="w-50"
              placeholder="8.000.000"
            />
          </Form.Group>
        </div>
        <div className="d-flex justify-content-end">
          <Button
            style={{
              width: "140px",
              height: "50px",
            }}
          >
            APPLY
          </Button>
        </div>
      </Col>
      <Col md={7} lg={8} className="bg-light p-4 ms-auto">
        <Row xs={1} md={2} lg={3} className="g-4">
          {houses?.map((item, index) => (
            <Col key={index} item={item}>
              <Link
                to={`/detail-property/` + item.id}
                className="text-decoration-none text-dark"
                style={{ cursor: "pointer" }}
              >
                <Card className="h-100 p-2 bg-light">
                  <Card.Img
                    variant="top rounded"
                    height="250px"
                    src={item.image}
                    className="position-relative"
                  />
                  <Card.Text className="rounded px-3 py-1 mt-2 ms-2 bg-white position-absolute top-1 start-1 ">
                    {item.ameneties}
                  </Card.Text>
                  <Card.Body className="px-0">
                    <Card.Title className="fw-bold">
                      {rupiahFormat.convert(item.price)} / {item.rent}
                    </Card.Title>
                    <Card.Text className="fw-bold mb-0">
                      {item.bedroom} Beds, {item.bathroom} Bath, {item.sqf} sqft
                    </Card.Text>
                    <Card.Text style={{ color: "#A8A8A8" }}>
                      {item.city.name}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
