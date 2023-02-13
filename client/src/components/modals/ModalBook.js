import React from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "../../App.css";

function ModalBook(props) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [book, setBook] = useState({
    checkin: "",
    checkout: "",
  });

  const handleChangeBook = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleBook = (e) => {
    e.preventDefault();
    navigate(`/booking/${id}`);
    localStorage.setItem("Date", JSON.stringify(book));
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Form className="pt-4 px-3 pb-2" onSubmit={handleBook}>
          <Modal.Title className="text-center fw-bold mb-5">
            How long you will stay
          </Modal.Title>
          <Form.Group className="mb-4 w-100" controlId="checkin">
            <Form.Label className="fw-bold">Check-in</Form.Label>
            <Form.Control
              type="date"
              name="checkin"
              onChange={handleChangeBook}
            />
            {/* <DatePicker
              selected={startDate}
              className="rounded border-0 bg-light"
              onChange={(date) => setStartDate(date)}
              // onChange={handleChangeBook}
              minDate={new Date()}
              dateFormat="d MMMM yyyy"
              type="date"
              name="checkinout"
              showDisabledMonthNavigation
              style={{
                width: "100%",
                height: "50px",
              }}
            /> */}
          </Form.Group>
          <Form.Group className="mb-5" controlId="checkout">
            <Form.Label className="fw-bold">Check-out</Form.Label>
            <Form.Control
              type="date"
              name="checkout"
              onChange={handleChangeBook}
            />
          </Form.Group>
          <Form.Group className="text-center">
            <Button
              variant="primary"
              style={{ width: "350px", height: "50px", fontWeight: "bold" }}
              type="submit"
              onClick={() => props.setModalShow(false)}
            >
              Order
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalBook;
