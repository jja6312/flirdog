import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../../css/main/Header.module.css";
import { Link } from "react-router-dom";
import HeaderCustomNavDropdownElement from "./HeaderCustomNavDropdownElement";
import { UserContext } from "../../contexts/UserContext";
import LogoutDropdown from "./LogoutDropdown";
import axios from "axios";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const [myDogsInfo, setMyDogsInfo] = useState({});
  const [storedUser, setStoredUser] = useState({});

  useEffect(() => {
    const localStorageUserInfo = localStorage.getItem("user");
    if (localStorageUserInfo) {
      console.log("localStorageUserInfo:", localStorageUserInfo);
      try {
        const parsedUser = JSON.parse(localStorageUserInfo);
        // JSON.parse가 정상적으로 되었을 때만 setUser 호출
        if (parsedUser && parsedUser.id) {
          setStoredUser(parsedUser);
          console.log("parsedUser:", parsedUser);
          axios
            .post("https://java.flirdog.store:8080/access/getDogsInfoArray", null, {
              params: {
                userId: parsedUser.id,
              },
            })
            .then((res) => {
              setMyDogsInfo(res.data);
              console.log("myDogsInfo:", res.data);
            });
        } else if (parsedUser && parsedUser.user.id) {
          setStoredUser(parsedUser);
          console.log("parsedUser:", parsedUser);
          axios
            .post("https://java.flirdog.store:8080/access/getDogsInfoArray", null, {
              params: {
                userId: parsedUser.user.id,
              },
            })
            .then((res) => {
              setMyDogsInfo(res.data);
              console.log("myDogsInfo:", res.data);
            });
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
  }, []);

  return (
    <div>
      <Navbar expand="lg" className={styles.navBar}>
        <Container className="px-10 d-flex justify-content-between">
          <Link to="/">
            <img
              src="/image/main/logo2.png"
              className={styles.logo}
              alt="logo"
            />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <div className={styles.spaceDiv}></div>
              <Nav.Link className={`${styles.navText} mx-2`} href="/">
                홈
              </Nav.Link>

              <Nav.Link
                className={`${styles.navText} mx-2`}
                href="/"
              ></Nav.Link>
              <Nav.Link
                className={`${styles.navText} mx-2`}
                href="/date/dateList"
              >
                애견 매칭
              </Nav.Link>
              <Nav.Link className={`${styles.navText} mx-2`} href="/somoim">
                애견 소모임
              </Nav.Link>
              <Nav.Link className={`${styles.navText} mx-2`} href="/product">
                쇼핑
              </Nav.Link>
              <HeaderCustomNavDropdownElement theme="커뮤니티" />
              {(storedUser && storedUser.id) ||
              (storedUser && storedUser.user && storedUser.user.id) ? (
                <LogoutDropdown
                  myDogsInfo={myDogsInfo}
                  storedUser={storedUser}
                ></LogoutDropdown>
              ) : (
                <Nav.Link className={`${styles.navText} mx-2`} href="/login">
                  로그인
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
