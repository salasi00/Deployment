import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../../config/api";

function ModalChangePassword(props) {
  const navigate = useNavigate();
  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handlerPassword = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault(); // Insert product data
      const response = await API.patch("/changepassword", password);
      console.log("SUCCESS CHANGE PASSWORD", response.data);

      if (password.new_password !== password.confirm_password) {
        return alert("new password and confirmation do not match!!!");
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="p-5">
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Modal.Title className="text-center mb-4">
            Change Password
          </Modal.Title>
          <Form.Group className="mb-3">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              onChange={handlerPassword}
              id="old_pasword"
              type="password"
              placeholder="Old Password"
              name="old_password"
              value={password.old_password}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              onChange={handlerPassword}
              type="password"
              placeholder="New Password"
              name="new_password"
              value={password.new_password}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              onChange={handlerPassword}
              type="password"
              placeholder="Confirm Password"
              name="confirm_password"
              value={password.confirm_password}
              autoFocus
            />
          </Form.Group>
          <Button className="bg-primary w-100 mt-4" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalChangePassword;