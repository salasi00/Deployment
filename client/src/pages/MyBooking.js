import React, { useEffect } from "react";
import "../App.css";

import jwt from "jwt-decode";

import convertRupiah from "rupiah-format";

import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

import {
  Badge,
  Button,
  Card,
  Container,
  Image,
  ListGroup,
  Table,
} from "react-bootstrap";

// import { useParams } from "react-router-dom";

// import data from "../components/data/homes";

import IconNavbar from "../assets/icons/IconNavbar.png";
import Moment from "react-moment";
// import ModalAfterBooking from "../components/modals/ModalAfterBooking";
import { useNavigate, useParams } from "react-router-dom";

function MyBooking() {
  const getData = JSON.parse(localStorage.getItem("Date"));

  console.log("ini checkin", typeof getData.checkin);

  // const getDataProfile = JSON.parse(localStorage.getItem("SignUp"));

  let history = useNavigate();

  const getToken = localStorage.getItem("token");
  const hasilDecode = jwt(getToken);

  const { id } = useParams();

  // Fetching data user from database
  const { data: user } = useQuery("userCache", async () => {
    const response = await API.get("/user/" + hasilDecode.id);
    console.log("ini response user", response);
    return response.data.data;
  });

  // Fetching data house from database
  // const { data: house } = useQuery("houseCache", async () => {
  //   const response = await API.get("/house/" + id);
  //   console.log("ini response house", response);
  //   return response.data.data;
  // });

  let { data: house, refetch } = useQuery("houseCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await API.get("/house/" + id, config);
    console.log("data response test", response);
    console.log("data refetch test", refetch);
    return response.data.data;
  });

  const dateTime = new Date();

  const checkin = new Date(getData.checkin);
  const checkout = new Date(getData.checkout);

  const handleTransaction = useMutation(async () => {
    try {
      const response = await API.post("/transaction", {
        checkin: checkin,
        checkout: checkout,
        houseid: house.id,
        userid: user.id,
        total: house.price,
        status: "Pending",
      });

      const tokenBaru = response.data.data.token;
      console.log(
        "habis add transaction tokennnnnn : ",
        response.data.data.token
      );

      window.snap.pay(tokenBaru, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          history("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          history("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-kcBD2UV-NpQHxEFw";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div className="bg-light py-5">
      <Container>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <div className="d-flex justify-content-between mb-4">
                <div>
                  <Image src={IconNavbar} />
                </div>
                <div className="d-flex flex-column align-items-center">
                  <div style={{ fontSize: "36px", fontWeight: "800" }}>
                    Booking
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      color: "#878787",
                      fontWeight: "400",
                    }}
                  >
                    <Moment format="dddd" className="fw-bold">
                      {dateTime}
                    </Moment>
                    , <Moment format="D MMM YYYY">{dateTime}</Moment>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex flex-column gap-3">
                  <div style={{ fontSize: "24px", fontWeight: "800" }}>
                    {house?.name}
                  </div>
                  <div style={{ fontSize: "14px" }}>
                    {house?.address}, {house?.city.name}
                  </div>
                  <div className="ms-3">
                    <Badge bg="danger" className="rounded-0">
                      Waiting Payment
                    </Badge>
                  </div>
                </div>
                <div>
                  <ul className="timeline mt-3">
                    <li className="timeline-item-top mb-5">
                      <h5 className="fw-bold">Check-in</h5>
                      <div style={{ fontSize: "14px", color: "#959595" }}>
                        <Moment format="DD MMM YYYY">{getData.checkin}</Moment>
                      </div>
                    </li>
                    <li className="timeline-item-bottom">
                      <h5 className="fw-bold">Check-out</h5>
                      <div style={{ fontSize: "14px", color: "#959595" }}>
                        <Moment format="DD MMM YYYY">{getData.checkout}</Moment>
                      </div>
                      {/* <div style={{ fontSize: "14px", color: "#959595" }}>
                        <Moment format="DD MMM YYYY">
                          {getData.checkinout}
                        </Moment>
                      </div> */}
                    </li>
                  </ul>
                </div>
                <div className="d-flex flex-column gap-4">
                  <div>
                    <div style={{ fontSize: "18px", fontWeight: "700" }}>
                      Ameneties
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#959595",
                      }}
                    >
                      {house?.ameneties}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "18px", fontWeight: "700" }}>
                      Type of Rent
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#959595",
                      }}
                    >
                      {house?.rent}
                    </div>
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
                    {user?.fullname}
                  </td>
                  <td
                    style={{
                      fontSize: "18px",
                      color: "#B1B1B1",
                    }}
                  >
                    {user?.gender}
                  </td>
                  <td
                    style={{
                      fontSize: "18px",
                      color: "#B1B1B1",
                    }}
                  >
                    {user?.phone}
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
                    <Moment
                      duration={getData.checkin}
                      date={getData.checkout}
                    />
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
                      color: "#FF0000",
                      borderBottomStyle: "none",
                    }}
                  >
                    {convertRupiah.convert(house?.price)}
                  </td>
                </tr>
              </tbody>
            </Table>
          </ListGroup>
        </Card>
        <div className="d-flex justify-content-end">
          <Button
            className="mt-4"
            style={{
              backgroundColor: "#5A57AB",
              borderColor: "#5A57AB",
              fontSize: "18px",
              fontWeight: "700",
              color: "#FFFFFF",
              width: "213px",
              height: "50px",
            }}
            onClick={() => handleTransaction.mutate()}
          >
            PAY
          </Button>
          {/* <ModalAfterBooking /> */}
        </div>
      </Container>
    </div>
  );
}

export default MyBooking;
