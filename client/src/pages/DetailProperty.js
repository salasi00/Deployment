import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";

import ModalBook from "../components/modals/ModalBook";

import convertRupiah from "rupiah-format";

import { useParams } from "react-router-dom";

import { useQuery } from "react-query";
import { API } from "../config/api";

import iconBed from "../assets/icons/IconBed.png";
import iconBath from "../assets/icons/IconBath.png";

const styles = {
  Image: {
    maxHeight: "75vh",
    objectFit: "cover",
  },
};

function DetailProperty() {
  const [modalShow, setModalShow] = React.useState(false);
  const { id } = useParams();

  let { data: house } = useQuery("houseCache", async () => {
    const response = await API.get("/house/" + id);
    console.log(response);
    return response.data.data;
  });

  return (
    <div className="bg-light py-5">
      <Container>
        <div className="mb-4">
          <Row className="mb-2">
            <Col>
              <Image
                src={house?.image}
                style={styles.Image}
                className="img-fluid w-100 rounded"
              />
            </Col>
          </Row>
          <Row>
            <Col md={4} xs={4}>
              <div className="card h-100">
                <Image src={house?.image} />
              </div>
            </Col>
            <Col md={4} xs={4}>
              <div className="card h-100">
                <Image src={house?.image} />
              </div>
            </Col>
            <Col md={4} xs={4} className="position-relative pe-none">
              <div
                className="card border h-100"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                }}
              >
                <Image src={house?.image} className="opacity-50 rounded" />
                <h4 className="position-absolute top-50 start-50 translate-middle text-white">
                  +5
                </h4>
              </div>
            </Col>
          </Row>
        </div>
        <Container className="px-4">
          <div className="mb-4">
            <div style={{ fontSize: "48px", fontWeight: "700" }}>
              {house?.name}
            </div>
          </div>
          <div className="mb-4 d-flex justify-content-between">
            <div className="d-flex flex-column">
              <div style={{ fontSize: "24px", fontWeight: "700" }}>
                {convertRupiah.convert(house?.price)} / {house?.rent}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  width: "290px",
                  fontWeight: "500",
                  color: "#A8A8A8",
                }}
              >
                {house?.address}, {house?.city.name}
              </div>
            </div>
            <div className="d-flex gap-5">
              <div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#A8A8A8",
                    fontWeight: "500",
                  }}
                >
                  Bedrooms
                </div>
                <div className="d-flex gap-2">
                  <div style={{ fontSize: "18px", fontWeight: "700" }}>
                    {house?.bedroom}
                  </div>
                  <div>
                    <Image src={iconBed} />
                  </div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#A8A8A8",
                    fontWeight: "500",
                  }}
                >
                  Bathrooms
                </div>
                <div className="d-flex gap-2">
                  <div style={{ fontSize: "18px", fontWeight: "700" }}>
                    {house?.bathroom}
                  </div>
                  <div>
                    <Image src={iconBath} />
                  </div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#A8A8A8",
                    fontWeight: "500",
                  }}
                >
                  Area
                </div>
                <div style={{ fontSize: "18px", fontWeight: "700" }}>
                  {house?.sqf} ft
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div style={{ fontSize: "18px", fontWeight: "800" }}>
              Description
            </div>
            <div
              style={{ fontSize: "14px", fontWeight: "400", color: "#A8A8A8" }}
            >
              {house?.description}
            </div>
          </div>
          {localStorage.getItem("role") === "Tenant" ? (
            <div className="d-flex justify-content-end">
              <Button
                variant="primary"
                onClick={() => setModalShow(true)}
                style={{
                  width: "213px",
                  height: "50px",
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  backgroundColor: "#5A57AB",
                  borderColor: "#5A57AB",
                }}
              >
                BOOK NOW
              </Button>
              <ModalBook show={modalShow} onHide={() => setModalShow(false)} />
            </div>
          ) : (
            <></>
          )}
        </Container>
      </Container>
    </div>
  );
}

export default DetailProperty;
