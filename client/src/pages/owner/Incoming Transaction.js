import React, { useState } from "react";
import {
  Button,
  Container,
  Image,
  ListGroup,
  Modal,
  Table,
} from "react-bootstrap";

import IconHousyBooking from "../../assets/icons/IconHousyBooking.png";
import PaymentProof from "../../assets/payment_proof.png";

import IconSearch from "../../assets/icons/IconSearch.png";
import Moment from "react-moment";

import { useQuery } from "react-query";
import { API } from "../../config/api";

const IncomingTransaction = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const date = new Date();

  // Fetching data from database
  let { data: transaction } = useQuery("transactionCache", async () => {
    const response = await API.get("/transaction");
    console.log(response);
    return response.data.data;
  });

  return (
    <>
      <div className="bg-light py-5">
        <Container>
          <h2 className="mb-3">Incoming Transaction</h2>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Users</th>
                <th>Type of Rent</th>
                <th>Bukti Transfer</th>
                <th className="text-center">Status Payment</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {transaction?.map((value, index) => {
                let statusPayment;
                const success = value.status;
                const pending = value.status;
                if (success === "success") {
                  statusPayment = (
                    <td className="text-success text-center">{value.status}</td>
                  );
                } else if (pending === "Pending") {
                  statusPayment = (
                    <td className="text-warning text-center">{value.status}</td>
                  );
                } else {
                  statusPayment = (
                    <td className="text-danger text-center">{value.status}</td>
                  );
                }

                return (
                  <tr key={index}>
                    <td>{value.id}</td>
                    <td>{value.house.name}</td>
                    <td>{value.house.rent}</td>
                    <td>{value.attachment}</td>
                    {statusPayment}
                    <td className="text-center">
                      <Image src={IconSearch} onClick={handleShow} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
      <Modal size="xl" show={show} centered onHide={handleClose}>
        <Modal.Header
          closeButton
          style={{ borderBottom: "none" }}
        ></Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <div className="d-flex justify-content-between mb-4">
                <div>
                  <Image src={IconHousyBooking} />
                </div>
                <div className="d-flex flex-column align-items-center">
                  <div
                    style={{
                      fontSize: "36px",
                      fontWeight: "800",
                    }}
                  >
                    BOOKING
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      color: "#878787",
                      fontWeight: "400",
                    }}
                  >
                    <Moment format="dddd" className="fw-bold">
                      {date}
                    </Moment>
                    , <Moment format="D MMM YYYY">{date}</Moment>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column gap-3">
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "800",
                    }}
                  >
                    {/* {data[id - 1].name_property} */}
                    Housy
                  </div>
                  <div style={{ fontSize: "14px", width: "282px" }}>
                    {/* {data[id - 1].address} */}
                    Sawangan, Depok
                  </div>
                </div>
                <div>
                  <ul className="timeline mt-3">
                    <li className="timeline-item-top mb-5">
                      <h5 className="fw-bold">Check-in</h5>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#959595",
                        }}
                      >
                        {/* <Moment format="DD MMM YYYY">{getData.checkin}</Moment> */}
                        <Moment format="DD MMM YYYY">{date}</Moment>
                      </div>
                    </li>
                    <li className="timeline-item-bottom">
                      <h5 className="fw-bold">Check-out</h5>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#959595",
                        }}
                      >
                        {/* <Moment format="DD MMM YYYY">{getData.checkout}</Moment> */}
                        <Moment format="DD MMM YYYY">{date}</Moment>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="d-flex flex-column gap-4">
                  <div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "700",
                      }}
                    >
                      Amenites
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#959595",
                      }}
                    >
                      {/* {data[id - 1].amenities} */}
                      Amenities
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "700",
                      }}
                    >
                      Type of Rent
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#959595",
                      }}
                    >
                      1
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <Image src={PaymentProof} />
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#818181",
                    }}
                  >
                    upload payment proof
                  </div>
                </div>
              </div>
            </ListGroup.Item>
            <Table responsive>
              <thead>
                <tr>
                  <th
                    style={{
                      fontSize: "18px",
                      fontWeight: "800",
                    }}
                  >
                    No
                  </th>
                  <th
                    style={{
                      fontSize: "18px",
                      fontWeight: "800",
                    }}
                  >
                    Full Name
                  </th>
                  <th
                    style={{
                      fontSize: "18px",
                      fontWeight: "800",
                    }}
                  >
                    Gender
                  </th>
                  <th
                    style={{
                      fontSize: "18px",
                      fontWeight: "800",
                    }}
                    colSpan={3}
                  >
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      fontSize: "18px",
                      color: "#B1B1B1",
                    }}
                  >
                    1
                  </td>
                  <td
                    style={{
                      fontSize: "18px",
                      color: "#B1B1B1",
                    }}
                  >
                    {/* {getDataProfile.fullname} */}
                    Farid Nugroho
                  </td>
                  <td
                    style={{
                      fontSize: "18px",
                      color: "#B1B1B1",
                    }}
                  >
                    {/* {getDataProfile.gender} */}
                    Male
                  </td>
                  <td
                    style={{
                      fontSize: "18px",
                      color: "#B1B1B1",
                    }}
                  >
                    {/* {getDataProfile.phone} */}
                    085729299918
                  </td>
                  <td
                    style={{
                      fontSize: "18px",
                      fontWeight: "800",
                    }}
                    className="text-end"
                  >
                    Long time rent:
                  </td>
                  <td
                    style={{
                      fontSize: "18px",
                      fontWeight: "800",
                    }}
                    colSpan={2}
                  >
                    {/* 1 {data[id - 1].rent} */}1 Year
                  </td>
                </tr>
                <tr style={{ borderBottomStyle: "none" }}>
                  <td colSpan={4} style={{ borderBottomStyle: "none" }}></td>
                  <td
                    style={{
                      fontSize: "18px",
                      fontWeight: "800",
                      borderBottomStyle: "none",
                    }}
                    className="text-end"
                  >
                    Total:
                  </td>
                  <td
                    colSpan={2}
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#3CF71E",
                      borderBottomStyle: "none",
                    }}
                  >
                    {/* {data[id - 1].price} */}
                    Rp3.000.000
                  </td>
                </tr>
              </tbody>
            </Table>
            <div className="d-flex justify-content-end gap-3 me-5">
              <Button
                style={{
                  backgroundColor: "#FF0742",
                  borderColor: "#FFFFFF",
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#FFFFFF",
                  width: "100px",
                  height: "35px",
                  padding: "0px",
                }}
              >
                Cancel
              </Button>
              <Button
                style={{
                  backgroundColor: "#0ACF83",
                  borderColor: "#FFFFFF",
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#FFFFFF",
                  width: "100px",
                  height: "35px",
                  padding: "0px",
                }}
              >
                Approve
              </Button>
            </div>
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default IncomingTransaction;
