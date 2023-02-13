import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

function ModalChangePassword(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="p-5">
        <Form>
          <Modal.Title className="text-center mb-4">
            Change Password
          </Modal.Title>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Old Password</Form.Label>
            <Form.Control type="password" autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" />
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
