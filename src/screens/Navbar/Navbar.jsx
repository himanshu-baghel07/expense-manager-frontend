import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";

const NavigationBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" sticky="top" className="navbar_cont">
      <Container>
        {/* Logo on the left */}
        <Navbar.Brand href="/">MyLogo</Navbar.Brand>

        {/* Hamburger menu for small screens */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        {/* Links in the navbar */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
