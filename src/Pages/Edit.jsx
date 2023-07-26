import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import Spinner from "../Components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { singleUserGetFunction, editFunction } from "../Services/Apis";
import { BASE_URL } from "../Services/Helper";

export default function Edit() {
  const [inputData, setInputData] = useState({
    name: "",
    dateOfBirth: "",
    fatherName: "",
    motherName: "",
    city: "",
    birthStar: "",
    colour: "",
    education: "",
    income: "",
    caste: "",
    birthPlace: "",
    height: "",
    gotra: "",
    zodiacSign: "",
    profession: "",
    detailsOfBrideOrGroomWealth: "",
    parentsDetails: "",
    parentsFamilyDetails: "",
    address: "",
    mothersRelativeDetails: "",
    fathersRelativeDetails: "",
    email: "",
    mobile: "",
    gender: "",
  });

  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [imgData, setImgData] = useState("");
  const [showSpin, setShowSpin] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams();

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

  const userProfileGet = async () => {
    const response = await singleUserGetFunction(id);

    if (response.status === 200) {
      setInputData(response.data);
      setStatus(response.data.status);
      setImgData(response.data.profile);
    } else {
      console.log("error");
    }
  };

  const submitUserData = async (e) => {
    e.preventDefault();
    const {
      name,
      dateOfBirth,
      fatherName,
      motherName,
      city,
      birthStar,
      colour,
      education,
      income,
      caste,
      birthPlace,
      height,
      gotra,
      zodiacSign,
      profession,
      detailsOfBrideOrGroomWealth,
      parentsDetails,
      parentsFamilyDetails,
      address,
      mothersRelativeDetails,
      fathersRelativeDetails,
      email,
      mobile,
      gender,
    } = inputData;

    if (name === "") {
      toast.error("Name is Required!");
    } else if (dateOfBirth === "") {
      toast.error("Date Of Birth is Required!");
    } else if (fatherName === "") {
      toast.error("Father Name is Required!");
    } else if (motherName === "") {
      toast.error("Mother Name is Required!");
    } else if (city === "") {
      toast.error("City is Required!");
    } else if (birthStar === "") {
      toast.error("Birth Star is Required!");
    } else if (colour === "") {
      toast.error("Colour is Required!");
    } else if (education === "") {
      toast.error("Education is Required!");
    } else if (income === "") {
      toast.error("Income is Required!");
    } else if (caste === "") {
      toast.error("Caste is Required!");
    } else if (birthPlace === "") {
      toast.error("Birth Place is Required!");
    } else if (height === "") {
      toast.error("Height is Required!");
    } else if (gotra === "") {
      toast.error("Gotram is Required!");
    } else if (zodiacSign === "") {
      toast.error("Zodiac Sign is Required!");
    } else if (profession === "") {
      toast.error("Profession is Required!");
    } else if (detailsOfBrideOrGroomWealth === "") {
      toast.error("Details Of Bride Or Groom Wealth is Required!");
    } else if (parentsDetails === "") {
      toast.error("Parents Details is Required!");
    } else if (parentsFamilyDetails === "") {
      toast.error("Parents Family Details is Required!");
    } else if (address === "") {
      toast.error("Address is Required!");
    } else if (mothersRelativeDetails === "") {
      toast.error("Mothers Relative Details is Required!");
    } else if (fathersRelativeDetails === "") {
      toast.error("Fathers Relative Details is Required!");
    } else if (email === "") {
      toast.error("Email is Required!");
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email!");
    } else if (mobile === "") {
      toast.error("Mobile is Required!");
    } else if (mobile.length > 10) {
      toast.error("Enter Valid Mobile Number!");
    } else if (gender === "") {
      toast.error("Gender is Required!");
    } else if (status === "") {
      toast.error("Status is Required!");
    } else if (image === "") {
      toast.error("Profile is Required!");
    } else {
      const data = new FormData();
      data.append("name", name);
      data.append("dateOfBirth", dateOfBirth);
      data.append("fatherName", fatherName);
      data.append("motherName", motherName);
      data.append("city", city);
      data.append("birthStar", birthStar);
      data.append("colour", colour);
      data.append("education", education);
      data.append("income", income);
      data.append("caste", caste);
      data.append("birthPlace", birthPlace);
      data.append("height", height);
      data.append("gotra", gotra);
      data.append("zodiacSign", zodiacSign);
      data.append("profession", profession);
      data.append("detailsOfBrideOrGroomWealth", detailsOfBrideOrGroomWealth);
      data.append("parentDetails", parentsDetails);
      data.append("parentsFamilyDetails", parentsFamilyDetails);
      data.append("address", address);
      data.append("mothersRelativeDetails", mothersRelativeDetails);
      data.append("fathersRelativeDetails", fathersRelativeDetails);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("status", status);
      data.append("profile", image || imgData);

      const config = {
        "Content-Type": "multipart/form-data",
      };

      const response = await editFunction(id, data, config);

      if (response.status === 200) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    userProfileGet();
  }, [id]);

  useEffect(() => {
    if (image) {
      setImgData("");
      setPreview(URL.createObjectURL(image));
    }
    setTimeout(() => {
      setShowSpin(false);
    }, 500);
  }, [image]);

  return (
    <>
      {showSpin ? (
        <Spinner />
      ) : (
        <div className="container">
          <h2 className="text-center mt-1">Update Your Details</h2>
          <Card className="shadow mt-3 p-3">
            <div className="profile_div text-center">
              <img
                src={image ? preview : `${BASE_URL}/uploads/${imgData}`}
                alt="img"
                style={{
                  maxWidth: "100px",
                  borderRadius: "50%",
                  border: "1px solid #111",
                }}
              />
            </div>
            <Form>
              <Row>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Bride/Groom Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={inputData.name}
                    onChange={setInputValue}
                    placeholder="Enter FirstName"
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicDate">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
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
                  <Form.Label>Income</Form.Label>
                  <Form.Control
                    type="text"
                    name="income"
                    value={inputData.income}
                    onChange={setInputValue}
                    placeholder="Enter Income"
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
                  <Form.Label>Parents Details</Form.Label>
                  <Form.Control
                    type="text"
                    name="parentsDetails"
                    value={inputData.parentsDetails}
                    onChange={setInputValue}
                    placeholder="Enter Parents Details"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Parents Family Details</Form.Label>
                  <Form.Control
                    type="text"
                    name="parentsFamilyDetails"
                    value={inputData.parentsFamilyDetails}
                    onChange={setInputValue}
                    placeholder="Enter Parents Family Details"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Address</Form.Label>
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
                  <Form.Label>Select Your Status</Form.Label>
                  <Select
                    options={options}
                    onChange={setStatusValue}
                    defaultValue={status}
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
                    checked={inputData.gender === "Male" ? true : false}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    onChange={setInputValue}
                    checked={inputData.gender === "Female" ? true : false}
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
                <Button
                  variant="primary"
                  type="submit"
                  onClick={submitUserData}
                >
                  Submit
                </Button>
              </Row>
            </Form>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      )}
    </>
  );
}
