import React, { useState } from "react";
import { Button, Container, Form, Image, Alert } from "react-bootstrap";

import jwt from "jwt-decode";

import { useMutation } from "react-query";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";

function AddProperty() {
  const getToken = localStorage.getItem("token");
  const hasilDecode = jwt(getToken);
  console.log("ini hasilDecode", hasilDecode.id);
  console.log("ini tipe hasilDecode", typeof hasilDecode.id);

  const navigate = useNavigate();
  const [preview, setPreview] = useState(null); //For image preview
  const [addProperty, setAddProperty] = useState({
    image: "",
    name: "",
    cityid: "",
    userid: hasilDecode.id,
    address: "",
    price: "",
    rent: "",
    amenities: [],
    bedroom: "",
    bathroom: "",
    sqf: "",
    description: "",
  });

  const handleChangeAddProperty = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let newAmenities = [...addProperty.amenities];
      if (checked) {
        newAmenities.push(value);
      } else {
        newAmenities = newAmenities.filter((amen) => amen !== value);
      }
      setAddProperty({ ...addProperty, amenities: newAmenities });
    } else {
      setAddProperty({
        ...addProperty,
        [name]: type === "file" ? e.target.files : e.target.value,
      });
    }

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      console.log("blob image", url);
      setPreview(url);
    }
    console.log(e.target.name, e.target.value);
  };

  const handleAddProperty = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("image", addProperty.image[0]);
      formData.append("name", addProperty.name);
      formData.append("cityid", addProperty.cityid);
      formData.append("userid", addProperty.userid);
      formData.append("address", addProperty.address);
      formData.append("price", addProperty.price);
      formData.append("rent", addProperty.rent);
      formData.append("amenities", JSON.stringify(addProperty.amenities));
      formData.append("bedroom", addProperty.bedroom);
      formData.append("bathroom", addProperty.bathroom);
      formData.append("sqf", addProperty.sqf);
      formData.append("description", addProperty.description);

      const response = await API.post("/house", formData);
      console.log("berhasil menambahkan house", response);

      addProperty.image = "";
      addProperty.name = "";
      addProperty.cityid = "";
      addProperty.userid = "";
      addProperty.address = "";
      addProperty.price = "";
      addProperty.rent = "";
      addProperty.amenities = "";
      addProperty.bedroom = "";
      addProperty.bathroom = "";
      addProperty.sqf = "";
      addProperty.description = "";

      const alert = (
        <Alert variant="danger" className="py-1">
          Property has been Uploaded
        </Alert>
      );
      navigate(`/`);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed to Upload Property
        </Alert>
      );
      console.log(error);
    }
  });

  let { data: cities } = useQuery("citiesCache", async () => {
    const response = await API.get("/cities");
    // console.log(response);
    return response.data.data;
  });

  return (
    <div className="bg-light py-5">
      <Container>
        <h2 className="mb-3">Add Property</h2>
        <Form onSubmit={(e) => handleAddProperty.mutate(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Name Property</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={addProperty?.name}
              onChange={handleChangeAddProperty}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">City</Form.Label>
            <Form.Select
              name="cityid"
              value={addProperty?.cityid}
              onChange={handleChangeAddProperty}
              required
            >
              <option>-- Pilih --</option>
              {cities?.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Address</Form.Label>
            <Form.Control
              rows={4}
              as="textarea"
              name="address"
              value={addProperty?.address}
              onChange={handleChangeAddProperty}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={addProperty?.price}
              onChange={handleChangeAddProperty}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Type of Rent</Form.Label>
            <Form.Select
              name="rent"
              value={addProperty?.rent}
              onChange={handleChangeAddProperty}
              required
            >
              <option>-- Pilih --</option>
              <option value="Day">Day</option>
              <option value="Month">Month</option>
              <option value="Year">Year</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3 d-flex flex-column" controlId="amenities">
            <Form.Label className="fw-bold">Amenities</Form.Label>
            <Form.Group className="d-flex gap-4">
              <Form.Check
                onChange={handleChangeAddProperty}
                checked={addProperty?.amenities.includes("Furnished")}
                value="Furnished"
                type="checkbox"
                label="Furnished"
              />
              <Form.Check
                onChange={handleChangeAddProperty}
                checked={addProperty?.amenities.includes("Pet Allowed")}
                value="Pet Allowed"
                type="checkbox"
                label="Pet Allowed"
              />
              <Form.Check
                onChange={handleChangeAddProperty}
                checked={addProperty?.amenities.includes("Shared Accomodation")}
                value="Shared Accomodation"
                type="checkbox"
                label="Shared Accomodation"
              />
            </Form.Group>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Bedroom</Form.Label>
            <Form.Select
              name="bedroom"
              value={addProperty?.bedroom}
              onChange={handleChangeAddProperty}
              required
            >
              <option>-- Pilih --</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Bathroom</Form.Label>
            <Form.Select
              name="bathroom"
              value={addProperty?.bathroom}
              onChange={handleChangeAddProperty}
              required
            >
              <option>-- Pilih --</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">SQF</Form.Label>
            <Form.Control
              type="text"
              name="sqf"
              value={addProperty?.sqf}
              onChange={handleChangeAddProperty}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Description</Form.Label>
            <Form.Control
              rows={4}
              as="textarea"
              name="description"
              value={addProperty?.description}
              onChange={handleChangeAddProperty}
              required
            />
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label className="fw-bold">Photo House</Form.Label>
            <Form.Control
              type="file"
              id="upload"
              name="image"
              onChange={handleChangeAddProperty}
            />
            {preview && (
              <Image
                src={preview}
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "cover",
                  marginTop: "10px",
                }}
              />
            )}
          </Form.Group>

          <Form.Group
            className="mb-3 d-flex justify-content-center"
            controlId="button"
          >
            <Button
              variant="primary"
              type="submit"
              style={{ width: "300px", height: "50px" }}
            >
              Save
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}

export default AddProperty;
