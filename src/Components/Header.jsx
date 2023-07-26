import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export default function Header() {
  return (
    <Navbar className="bg-body-tertiary p-2">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="https://matrimony.cresolinfoserv.com/images/kongumudi-logo.png"
            alt="logo"
            style={{ width: "160px", height: "100px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <h5>SIGN IN</h5>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
