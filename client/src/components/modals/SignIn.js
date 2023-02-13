import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useMutation } from "react-query";
import { API } from "../../config/api";

function SignIn(props) {
  const handleClose = () => props.setSignInShow(false);

  const [state, dispatch] = useContext(UserContext);
  console.log(state);

  const handleChange = (e) => {
    props.setSignIn({
      ...props.signIn,
      [e.target.name]: e.target.value,
    });
  };

  const goToSignUp = (e) => {
    props.setSignInShow(false);
    props.setSignUpShow(true);
  };

  const navigate = useNavigate();

  // Create function for handle insert data process with useMutation here ...
  const handleLogin = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/login", props.signIn);

      if (response.data.code == 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
        console.log("responseeee", response);
        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );

        props.setSignInShow(false);
        props.setSignIn(true);

        response.data.data.role.name === "Owner"
          ? navigate("/owner")
          : navigate("/");
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Login failed
          </Alert>
        );
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Wrong Username or Password 
        </Alert>
      );
      console.log(error);
      props.setSignInShow(true);
    }
  });

  return (
    <>
      <Modal show={props.signInShow} onHide={handleClose}>
        <Modal.Body>
          <Form
            className="pt-4 px-3 pb-2"
            onSubmit={(e) => handleLogin.mutate(e)}
          >
            <Modal.Title className="text-center fw-bold mb-5">
              Sign in
            </Modal.Title>
            <Form.Group className="mb-4" controlId="username">
              <Form.Label className="fw-bold">Username</Form.Label>
              <Form.Control
                type="text"
                value={props.username}
                name="username"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-5" controlId="password">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                type="password"
                value={props.password}
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="d-flex gap-3 flex-column text-center">
              <Button
                variant="primary w-100"
                type="submit"
                // onClick={handleClose}
              >
                Sign in
              </Button>
              <Form.Group className="d-flex justify-content-center gap-1">
                <Form.Label className="text-secondary">
                  Don't have an account? Klik
                </Form.Label>
                <Form.Label
                  onClick={goToSignUp}
                  className="text-secondary fw-bold"
                  style={{ cursor: "pointer" }}
                >
                  Here
                </Form.Label>
              </Form.Group>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SignIn;
