import React from "react";
import "./Styles.css";
import Dropdown from "react-bootstrap/Dropdown";
import { DropdownButton } from "react-bootstrap";

export default function Filters() {
  return (
    <div className="fil_container p-5">
      <div className="d-flex flex-row flex-wrap">
        <div className="d-flex flex-column col-lg-2">
          <h6>I'm looking for</h6>
          <DropdownButton
            variant="#fff"
            id="dropdown-basic-button"
            title="I'm looking for"
          >
            <Dropdown.Item>Men</Dropdown.Item>
            <Dropdown.Item>Women</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="d-flex flex-column col-lg-2">
          <h6>Age</h6>
          <DropdownButton
            variant="#fff"
            id="dropdown-basic-button"
            title="Select Age"
          >
            <Dropdown.Item>18 to 30</Dropdown.Item>
            <Dropdown.Item>31 to 40</Dropdown.Item>
            <Dropdown.Item>41 to 50</Dropdown.Item>
            <Dropdown.Item>51 to 60</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="d-flex flex-column col-lg-2">
          <h6>Select Caste</h6>
          <DropdownButton
            variant="#fff"
            id="dropdown-basic-button"
            title="Reddy"
          >
            <Dropdown.Item>Reddy</Dropdown.Item>
            <Dropdown.Item>Naidu</Dropdown.Item>
            <Dropdown.Item>Vyshya</Dropdown.Item>
            <Dropdown.Item>Brahmin</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="d-flex flex-column col-lg-2">
          <h6>Profession</h6>
          <DropdownButton
            variant="#fff"
            id="dropdown-basic-button"
            title="Engineer"
          >
            <Dropdown.Item>Engineer</Dropdown.Item>
            <Dropdown.Item>Doctor</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="d-flex flex-column col-lg-2">
          <h6>Assests/Income</h6>
          <DropdownButton
            variant="#fff"
            id="dropdown-basic-button"
            title="9 LPA"
          >
            <Dropdown.Item>9 LPA</Dropdown.Item>
            <Dropdown.Item>16 LPA</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="d-flex flex-column col-lg-2">
          <h6>Select Gotra</h6>
          <DropdownButton
            variant="#fff"
            id="dropdown-basic-button"
            title="Agastya"
          >
            <Dropdown.Item>Agastya</Dropdown.Item>
            <Dropdown.Item>Atreya</Dropdown.Item>
            <Dropdown.Item>Bharadwaj</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
}
