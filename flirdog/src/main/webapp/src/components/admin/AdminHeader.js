import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "../../css/main/Header.css";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <div>
      <Navbar expand="lg" className="navBar">
        <Link to="/">
          <img src="/image/main/logo2.png" className="logo mx-4" alt="logo" />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className="spaceDiv"></div>
          </Nav>
          <Nav.Link className="navText" href="/" style={{ marginRight: 50 }}>
            로그아웃
          </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default AdminHeader;
