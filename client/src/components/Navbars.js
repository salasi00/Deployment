import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Image,
  Nav,
  Navbar,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";

import PhotoTenant from "../assets/tenant.jpg";
import PhotoOwner from "../assets/owner.png";
import iconNavbar from "../assets/icons/IconNavbar.png";
import iconSearch from "../assets/icons/IconSearch.png";
import iconUser from "../assets/icons/IconUser.png";
import iconBooking from "../assets/icons/IconBooking.png";
import iconBill from "../assets/icons/IconBill.png";
import iconLogout from "../assets/icons/IconLogout.png";
import iconAddProperty from "../assets/icons/AddProperty.png";
import SignIn from "./modals/SignIn";
import SignUp from "./modals/SignUp";

function Navbars() {
  const [signInShow, setSignInShow] = React.useState(false);
  const [signUpShow, setSignUpShow] = React.useState(false);

  const handleShow = () => setSignInShow(true);

  const [signIn, setSignIn] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const popoverTenant = (
    <Popover id="popover-basic">
      <Popover.Body className="d-flex flex-column gap-3 p-0">
        <div className="d-flex align-items-center gap-4 ps-4 pt-4 pe-5">
          <Image src={iconUser} />
          <Link to="/profile" className="text-decoration-none text-black">
            <h5 className="m-0">Profile</h5>
          </Link>
        </div>
        <div className="d-flex align-items-center gap-4 ps-4 pe-5">
          <Image src={iconBooking} />
          <Link to="/booking" className="text-decoration-none text-black">
            <h5 className="m-0">My Booking</h5>
          </Link>
        </div>
        <div className="d-flex align-items-center gap-4 ps-4 pe-5">
          <Image src={iconBill} />
          <Link to="/history" className="text-decoration-none text-black">
            <h5 className="m-0">History</h5>
          </Link>
        </div>
        <hr className="m-0" style={{ color: "black" }} />
        <div className="d-flex align-items-center gap-4 ps-4 pb-4 pe-5">
          <Image src={iconLogout} />
          <Link
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              navigate("/");
            }}
            to={"/"}
            className="text-decoration-none text-black"
          >
            <h5 className="m-0 pe-auto">Logout</h5>
          </Link>
        </div>
      </Popover.Body>
    </Popover>
  );

  const popoverOwner = (
    <Popover id="popover-basic">
      <Popover.Body className="d-flex flex-column gap-3 p-0">
        <div className="d-flex align-items-center gap-4 ps-4 pt-4 pe-5">
          <Image src={iconUser} />
          <Link to="/owner/profile" className="text-decoration-none text-black">
            <h5 className="m-0">Profile</h5>
          </Link>
        </div>
        <div className="d-flex align-items-center gap-4 ps-4 pe-5">
          <Image src={iconAddProperty} />
          <Link
            to="/owner/add-property"
            className="text-decoration-none text-black"
          >
            <h5 className="m-0">Add Property</h5>
          </Link>
        </div>
        <div className="d-flex align-items-center gap-4 ps-4 pe-5">
          <Image src={iconBill} />
          <Link
            to="/owner/history-income"
            className="text-decoration-none text-black"
          >
            <h5 className="m-0">History</h5>
          </Link>
        </div>
        <hr className="m-0" style={{ color: "black" }} />
        <div className="d-flex align-items-center gap-4 ps-4 pb-4 pe-5">
          <Image src={iconLogout} />
          <Link
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              navigate("/");
            }}
            to={"/"}
            className="text-decoration-none text-black"
          >
            <h5 className="m-0 pe-auto">Logout</h5>
          </Link>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar bg="white" expand="lg" className="px-5 sticky-top">
      <Navbar.Brand>
        {localStorage.getItem("role") === "Tenant" ? (
          <Link to="/">
            <img
              src={iconNavbar}
              className="d-inline-block align-top"
              alt="Icon Navbar"
            />
          </Link>
        ) : (
          <Link to="/owner">
            <img
              src={iconNavbar}
              className="d-inline-block align-top"
              alt="Icon Navbar"
            />
          </Link>
        )}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Form className="d-flex bg-light">
            <Form.Control
              type="search"
              placeholder="Search..."
              className="rounded-0 border-0 border-end bg-light ps-3"
              aria-label="Search"
              style={{ width: "18rem" }}
            />
            <Button variant="rounded-0">
              <Image src={iconSearch} />
            </Button>
          </Form>
        </Nav>
        <Nav className="ms-auto" style={{ cursor: "pointer" }}>
          {localStorage.getItem("token") ? (
            <>
              {localStorage.getItem("role") === "Tenant" ? (
                <OverlayTrigger
                  trigger="click"
                  rootClose
                  placement="bottom"
                  overlay={popoverTenant}
                >
                  <Image
                    src={PhotoTenant}
                    width={50}
                    height={50}
                    className="rounded-circle"
                  />
                </OverlayTrigger>
              ) : (
                <OverlayTrigger
                  trigger="click"
                  rootClose
                  placement="bottom"
                  overlay={popoverOwner}
                >
                  <Image
                    src={PhotoOwner}
                    width={50}
                    height={50}
                    className="rounded-circle"
                  />
                </OverlayTrigger>
              )}
            </>
          ) : (
            <>
              <Button variant="border border-0" onClick={handleShow}>
                Sign in
              </Button>
              <SignIn
                signIn={signIn}
                setSignIn={setSignIn}
                signInShow={signInShow}
                setSignInShow={setSignInShow}
                setSignUpShow={setSignUpShow}
              />

              <SignUp
                signUpShow={signUpShow}
                setSignUpShow={setSignUpShow}
                setSignInShow={setSignInShow}
              />
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navbars;
