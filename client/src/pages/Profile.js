import React, { useState, useEffect } from "react";
import { Button, Card, Container, Image, Form, Modal } from "react-bootstrap";

import jwt from "jwt-decode";

import ModalChangePassword from "../components/modals/ModalChangePassword";

import IconProfile from "../assets/icons/IconProfile.png";
import IconEnvelope from "../assets/icons/IconEnvelope.png";
import IconLock from "../assets/icons/IconLock.png";
import IconHome from "../assets/icons/IconHome.png";
import IconGender from "../assets/icons/IconGender.png";
import IconPhone from "../assets/icons/IconPhone.png";
import IconLocation from "../assets/icons/IconLocation.png";

import { useQuery } from "react-query";
import { API } from "../config/api";
import { useMutation } from "react-query";

const styles = {
  Cursor: {
    cursor: "pointer",
  },
};

const Profile = (props) => {
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
      console.log("password change", response.data);

      if (password.new_password !== password.confirm_password) {
        return alert("your password didn't match");
      }

      alert("successfuly change password!");

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  });

  const [modalShow, setModalShow] = React.useState(false);

  const getToken = localStorage.getItem("token");

  const hasilDecode = jwt(getToken);

  // console.log(hasilDecode.id);

  // Fetching data from database
  const { data: user, refetch } = useQuery("userCache", async () => {
    const response = await API.get("/user/" + hasilDecode.id);
    console.log("ini response nyaa", response);
    return response.data.data;
  });

  const [photo, setPhoto] = useState({
    image: "",
  });

  const handleChangePhoto = (e) => {
    const { name, type } = e.target;
    setPhoto({
      ...photo,
      [name]: type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      console.log("blob image", url);
    }
  };

  const handleUpdate = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      if (photo.image) {
        formData.set("image", photo?.image[0], photo?.image[0]?.name);
      }

      const response = await API.patch("/user/" + hasilDecode.id, formData);
      console.log("berhasil mengubah photo profile", response);

      photo.image = "";
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (photo) {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photo]);

  console.log("ini data usernya", user);
  return (
    <div className="bg-light py-5">
      <Container className="d-flex justify-content-center">
        <Card className="w-75">
          <Card.Body className="d-flex justify-content-between p-4">
            <div className="d-flex flex-column gap-4">
              <h4>Personal Info</h4>
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <Image src={IconProfile} />
                </div>
                <div>
                  <Card.Title>{user?.fullname}</Card.Title>
                  <Card.Text className="text-secondary">Full name</Card.Text>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <Image src={IconEnvelope} />
                </div>
                <div>
                  <Card.Title>{user?.email}</Card.Title>
                  <Card.Text className="text-secondary">Email</Card.Text>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <Image src={IconLock} />
                </div>
                <div>
                  <Card.Title style={styles.Cursor}>
                    <Card.Link
                      className="text-primary text-decoration-none"
                      onClick={() => setModalShow(true)}
                    >
                      Change Password
                    </Card.Link>
                    <ModalChangePassword
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                  </Card.Title>
                  <Card.Text className="text-secondary">Password</Card.Text>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <Image src={IconHome} />
                </div>
                <div>
                  <Card.Title>{user?.role.name}</Card.Title>
                  <Card.Text className="text-secondary">Status</Card.Text>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <Image src={IconGender} />
                </div>
                <div>
                  <Card.Title>{user?.gender}</Card.Title>
                  <Card.Text className="text-secondary">Gender</Card.Text>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <Image src={IconPhone} />
                </div>
                <div>
                  <Card.Title>{user?.phone}</Card.Title>
                  <Card.Text className="text-secondary">Mobile phone</Card.Text>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <Image src={IconLocation} />
                </div>
                <div>
                  <Card.Title>{user?.address}</Card.Title>
                  <Card.Text className="text-secondary">Address</Card.Text>
                </div>
              </div>
            </div>
            <div>
              <Card style={{ width: "18rem" }}>
                {localStorage.getItem("role") === "Tenant" ? (
                  <Card.Img variant="top" src={user?.image} />
                ) : (
                  <Card.Img
                    variant="top"
                    style={{
                      maxWidth: "18rem",
                      minHeight: "18rem",
                      objectFit: "cover",
                    }}
                    src={user?.image}
                  />
                )}
              </Card>
              {/* <Button className="btn btn-primary mt-2 w-100">
                Change Photo Profile
              </Button> */}
              <Form
                onSubmit={(e) => handleUpdate.mutate(e)}
                className="mt-2 w-100"
                style={{
                  maxWidth: "18rem",
                  objectFit: "cover",
                }}
              >
                <Form.Group className="mb-5">
                  <Form.Control
                    type="file"
                    id="upload"
                    name="image"
                    onChange={handleChangePhoto}
                    required
                  />
                  <Button
                    className="btn btn-primary mt-2 w-100"
                    type="submit"
                    style={{
                      maxWidth: "18rem",
                      objectFit: "cover",
                    }}
                  >
                    Change Photo Profile
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Container>
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
    </div>
  );
};

export default Profile;
