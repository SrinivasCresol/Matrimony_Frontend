import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import Spinner from "../Components/Spinner";
// import { registerFunction } from "../Services/Apis";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles.css";
import axios from "axios";
import { BASE_URL } from "../Services/Helper";

export default function Register({ showModal, handleClose }) {
  const [inputData, setInputData] = useState({
    name: "",
    surName: "",
    gender: "",
    caste: "",
    dateOfBirth: "",
    birthStar: "",
    birthPlace: "",
    gotra: "",
    zodiacSign: "",
    height: "",
    colour: "",
    city: "",
    education: "",
    profession: "",
    companyName: "",
    income: "",
    fatherName: "",
    motherName: "",
    fatherOccupation: "",
    motherOccupation: "",
    detailsOfBrideOrGroomWealth: "",
    mothersRelativeDetails: "",
    fathersRelativeDetails: "",
    mobile: "",
    email: "",
    address: "",
  });
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [showSpin, setShowSpin] = useState(true);
  const navigate = useNavigate();

  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const setStatusValue = (e) => {
    setStatus(e.value);
  };

  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", image);

      const uploadResponse = await axios.post(
        "https://s3-backend-file-upload.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (uploadResponse.status === 200) {
        console.log("File upload successful!");
        console.log(image.name);
        registerUser(image.name);
      }
    } catch (uploadError) {
      console.error("Error uploading the file:", uploadError);
    }
  };

  const registerUser = async (file) => {
    const {
      name,
      surName,
      gender,
      caste,
      dateOfBirth,
      birthStar,
      birthPlace,
      gotra,
      zodiacSign,
      height,
      colour,
      city,
      education,
      profession,
      companyName,
      income,
      fatherName,
      motherName,
      fatherOccupation,
      motherOccupation,
      detailsOfBrideOrGroomWealth,
      mothersRelativeDetails,
      fathersRelativeDetails,
      mobile,
      email,
      address,
    } = inputData;
    try {
      const registrationResponse = await axios.post(
        `${BASE_URL}/user/register`,
        {
          name,
          surName,
          gender,
          caste,
          dateOfBirth,
          birthStar,
          birthPlace,
          gotra,
          zodiacSign,
          height,
          colour,
          city,
          education,
          profession,
          companyName,
          income,
          fatherName,
          motherName,
          fatherOccupation,
          motherOccupation,
          detailsOfBrideOrGroomWealth,
          mothersRelativeDetails,
          fathersRelativeDetails,
          mobile,
          email,
          address,
          status,
          file,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (registrationResponse.status === 200) {
        console.log("User registration successful!");
        console.log("User data:", registrationResponse.data);
        setInputData({
          ...inputData,
          name: "",
          surName: "",
          gender: "",
          caste: "",
          dateOfBirth: "",
          birthStar: "",
          birthPlace: "",
          gotra: "",
          zodiacSign: "",
          height: "",
          colour: "",
          city: "",
          education: "",
          profession: "",
          companyName: "",
          income: "",
          fatherName: "",
          motherName: "",
          fatherOccupation: "",
          motherOccupation: "",
          detailsOfBrideOrGroomWealth: "",
          mothersRelativeDetails: "",
          fathersRelativeDetails: "",
          email: "",
          mobile: "",
          address: "",
          location: "",
        });
        setStatus("");
        setImage("");
        navigate("/");
      }
    } catch (registrationError) {
      console.error("Error registering user:", registrationError);
    }
  };

  const submitUserData = (e) => {
    e.preventDefault();
    handleFileUpload();
  };

  useEffect(() => {
    setTimeout(() => {
      setShowSpin(false);
    }, 500);
  }, [image]);

  return (
    <>
      {showSpin ? (
        <Spinner />
      ) : (
        <div id="registerModal" className="modals">
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Register Your Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Card className="shadow mt-3 p-3">
                <Form>
                  <Row>
                    <h2>Personal Information</h2>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={inputData.name}
                        onChange={setInputValue}
                        placeholder="Enter Name"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Sur Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="surName"
                        value={inputData.surName}
                        onChange={setInputValue}
                        placeholder="Enter Sur Name"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Select Your Gender</Form.Label>
                      <Form.Check
                        type={"radio"}
                        label={`Male`}
                        name="gender"
                        value={"Male"}
                        onChange={setInputValue}
                      />
                      <Form.Check
                        type={"radio"}
                        label={`Female`}
                        name="gender"
                        value={"Female"}
                        onChange={setInputValue}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Caste</Form.Label>
                      <Form.Control
                        type="text"
                        name="caste"
                        value={inputData.caste}
                        onChange={setInputValue}
                        placeholder="Enter Caste"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicDate"
                    >
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="dateOfBirth"
                        value={inputData.dateOfBirth}
                        onChange={setInputValue}
                        placeholder="Select Date of Birth"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Birth Star</Form.Label>
                      <Form.Control
                        type="text"
                        name="birthStar"
                        value={inputData.birthStar}
                        onChange={setInputValue}
                        placeholder="Enter Birth Star"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Birth Place</Form.Label>
                      <Form.Control
                        type="text"
                        name="birthPlace"
                        value={inputData.birthPlace}
                        onChange={setInputValue}
                        placeholder="Enter Birth Place"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Gotra</Form.Label>
                      <Form.Control
                        type="text"
                        name="gotra"
                        value={inputData.gotra}
                        onChange={setInputValue}
                        placeholder="Enter Gotra"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Zodiac Sign</Form.Label>
                      <Form.Control
                        type="text"
                        name="zodiacSign"
                        value={inputData.zodiacSign}
                        onChange={setInputValue}
                        placeholder="Enter Zodiac Sign"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Height</Form.Label>
                      <Form.Control
                        type="text"
                        name="height"
                        value={inputData.height}
                        onChange={setInputValue}
                        placeholder="Enter Height"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Colour</Form.Label>
                      <Form.Control
                        type="text"
                        name="colour"
                        value={inputData.colour}
                        onChange={setInputValue}
                        placeholder="Enter Colour"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Enter Your City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={inputData.city}
                        onChange={setInputValue}
                        placeholder="Enter Your City"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Select Your Profile</Form.Label>
                      <Form.Control
                        type="file"
                        name="profile"
                        onChange={setProfile}
                        placeholder="Select Your Profile"
                      />
                    </Form.Group>
                    <h2>Professional Details</h2>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Education</Form.Label>
                      <Form.Control
                        type="text"
                        name="education"
                        value={inputData.education}
                        onChange={setInputValue}
                        placeholder="Enter Education"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Profession</Form.Label>
                      <Form.Control
                        type="text"
                        name="profession"
                        value={inputData.profession}
                        onChange={setInputValue}
                        placeholder="Enter Profession"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="companyName"
                        value={inputData.companyName}
                        onChange={setInputValue}
                        placeholder="Enter Company Name"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Income</Form.Label>
                      <Form.Control
                        type="text"
                        name="income"
                        value={inputData.income}
                        onChange={setInputValue}
                        placeholder="Enter Income"
                      />
                    </Form.Group>
                    <h2>Family Information</h2>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Father Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="fatherName"
                        value={inputData.fatherName}
                        onChange={setInputValue}
                        placeholder="Enter Father Name"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Mother Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="motherName"
                        value={inputData.motherName}
                        onChange={setInputValue}
                        placeholder="Enter Mother Name"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Father Occupation</Form.Label>
                      <Form.Control
                        type="text"
                        name="fatherOccupation"
                        value={inputData.fatherOccupation}
                        onChange={setInputValue}
                        placeholder="Enter Father Occupation"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Mother Occupation</Form.Label>
                      <Form.Control
                        type="text"
                        name="motherOccupation"
                        value={inputData.motherOccupation}
                        onChange={setInputValue}
                        placeholder="Enter Mother Occupation"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-12"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Details of Bride or Groom Wealth</Form.Label>
                      <Form.Control
                        type="text"
                        name="detailsOfBrideOrGroomWealth"
                        value={inputData.detailsOfBrideOrGroomWealth}
                        onChange={setInputValue}
                        placeholder="Enter Details of Bride or Groom Wealth"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Mother Relative Details</Form.Label>
                      <Form.Control
                        type="text"
                        name="mothersRelativeDetails"
                        value={inputData.mothersRelativeDetails}
                        onChange={setInputValue}
                        placeholder="Enter Mother Relative Details"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Father Relative Details</Form.Label>
                      <Form.Control
                        type="text"
                        name="fathersRelativeDetails"
                        value={inputData.fathersRelativeDetails}
                        onChange={setInputValue}
                        placeholder="Enter Father Relative Details"
                      />
                    </Form.Group>
                    <h2>Contact Information</h2>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Mobile</Form.Label>
                      <Form.Control
                        type="text"
                        name="mobile"
                        value={inputData.mobile}
                        onChange={setInputValue}
                        placeholder="Enter Mobile"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={inputData.email}
                        onChange={setInputValue}
                        placeholder="Enter Email"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Full Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={inputData.address}
                        onChange={setInputValue}
                        placeholder="Enter Address"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Select Your Status</Form.Label>
                      <Select options={options} onChange={setStatusValue} />
                    </Form.Group>
                  </Row>
                </Form>
              </Card>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={submitUserData}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
          <ToastContainer position="top-center" />
        </div>
      )}
    </>
  );
}
