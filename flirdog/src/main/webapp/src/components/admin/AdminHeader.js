import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../../css/main/Header.module.css";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <div style={{ position: "relative" }}>
      <span className={styles.adminHeaderTitle}>관리자페이지 홈</span>
      <Navbar expand="lg" className={styles.navBar}>
        <Link to="/">
          <img
            src="/image/main/logo2.png"
            className={`${styles.logo} mx-4}`}
            alt="logo"
          />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className={styles.spaceDiv}></div>
          </Nav>
          <Nav.Link
            className={styles.navText}
            href="/"
            style={{ marginRight: 50 }}
          >
            로그아웃
          </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default AdminHeader;
