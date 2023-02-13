import { useState } from "react";
import { Button, Form, Image, Modal, Alert } from "react-bootstrap";

import { useMutation } from "react-query";
import { API } from "../../config/api";

import { useQuery } from "react-query";

function SignUp(props) {
  const handleClose = () => props.setSignUpShow(false);
  const handleShow = () => props.setSignUpShow(true);

  const [signUp, setSignUp] = useState({
    roleid: "",
    fullname: "",
    username: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    address: "",
  });

  const handleChangeSignUp = (e) => {
    const { name, type } = e.target;
    setSignUp({
      ...signUp,
      [name]: type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleRegister = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("roleid", signUp.roleid);
      formData.append("fullname", signUp.fullname);
      formData.append("username", signUp.username);
      formData.append("email", signUp.email);
      formData.append("password", signUp.password);
      formData.append("gender", signUp.gender);
      formData.append("phone", signUp.phone);
      formData.append("address", signUp.address);

      const response = await API.post("/register", formData);
      console.log("berhasil menambahkan user", response);

      signUp.roleid = "";
      signUp.fullname = "";
      signUp.username = "";
      signUp.email = "";
      signUp.password = "";
      signUp.gender = "";
      signUp.phone = "";
      signUp.address = "";

      props.setSignUpShow(false);
      props.setSignInShow(true);

      const alert = (
        <Alert variant="danger" className="py-1">
          Register Success
        </Alert>
      );

      signUp.fullname = "";
      signUp.username = "";
      signUp.email = "";
      signUp.password = "";
      signUp.roleid = "";
      signUp.gender = "";
      signUp.phone = "";
      signUp.address = "";
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed to Register
        </Alert>
      );
      console.log(error);
    }
  });

  let { data: roles } = useQuery("rolesCache", async () => {
    const response = await API.get("/roles");
    // console.log(response);
    return response.data.data;
  });

  return (
    <>
      <Modal show={props.signUpShow} onHide={handleClose}>
        <Modal.Body>
          <Form
            className="pt-4 px-3 pb-2"
            onSubmit={(e) => handleRegister.mutate(e)}
          >
            <Modal.Title className="text-center fw-bold mb-5">
              Sign up
            </Modal.Title>
            <Form.Group className="mb-4" controlId="fullname">
              <Form.Label className="fw-bold">Full Name</Form.Label>
              <Form.Control
                type="text"
                value={signUp?.fullname}
                name="fullname"
                onChange={handleChangeSignUp}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="username">
              <Form.Label className="fw-bold">Username</Form.Label>
              <Form.Control
                type="text"
                value={signUp?.username}
                name="username"
                onChange={handleChangeSignUp}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="email">
              <Form.Label className="fw-bold">Email</Form.Label>
              <Form.Control
                type="email"
                value={signUp?.email}
                name="email"
                onChange={handleChangeSignUp}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="password">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                type="password"
                value={signUp?.password}
                name="password"
                onChange={handleChangeSignUp}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="roleid">
              <Form.Label className="fw-bold">List As</Form.Label>
              <Form.Select
                name="roleid"
                value={signUp?.roleid}
                onChange={handleChangeSignUp}
              >
                <option>-- Pilih --</option>
                {roles?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4" controlId="gender">
              <Form.Label className="fw-bold">Gender</Form.Label>
              <Form.Select
                name="gender"
                value={signUp?.gender}
                onChange={handleChangeSignUp}
              >
                <option>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4" controlId="phone">
              <Form.Label className="fw-bold">Phone</Form.Label>
              <Form.Control
                type="number"
                value={signUp?.phone}
                name="phone"
                onChange={handleChangeSignUp}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="address">
              <Form.Label className="fw-bold">Address</Form.Label>
              <Form.Control
                rows={4}
                as="textarea"
                value={signUp?.address}
                name="address"
                onChange={handleChangeSignUp}
              />
            </Form.Group>
            <Form.Group className="d-flex gap-3 flex-column text-center">
              <Button variant="primary w-100" type="submit">
                Sign up
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>

      <Button variant="light fw-bold" onClick={handleShow}>
        Sign Up
      </Button>
    </>
  );
}

export default SignUp;
