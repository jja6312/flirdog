import React, { useState, useEffect, useContext } from "react";
import styles from "../../css/login/login.module.css";
import SocialKakao from "./loginAPI/SocialKaKao";
import { Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const Login = () => {
  const { login } = useContext(UserContext);
  const [credentials, setCredentials] = useState({
    email: "",
    passwd: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials(() => ({
      ...credentials,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("credentials");
    console.log(credentials);
  }, [credentials]);

  const handleLogin = () => {
    console.log("credentials.passwd");
    console.log(credentials.passwd);

    login(credentials);
  };

  return (
    <div
      className={`${styles.loginForm} d-flex justify-content-start align-items-center flex-column`}
    >
      <div
        className={`${styles.loginFormElementDiv} mt-4 d-flex justify-content-center align-items-center`}
      ></div>

      <Link to="/">
        <div
          className={`${styles.loginFormElementDiv} ${styles.logoTextDiv} d-flex justify-content-center align-items-center`}
        >
          <img
            src="/image/main/logoText.png"
            alt="logoText"
            style={{ height: "100%" }}
          />
        </div>
      </Link>
      <div
        className={`${styles.loginFormElementDiv} ${styles.kakaoDiv} mt-2 d-flex justify-content-center align-items-center`}
      >
        <SocialKakao></SocialKakao>
      </div>
      <div
        className={`${styles.loginFormElementDiv} ${styles.googleDiv} mt-2 d-flex justify-content-center align-items-center`}
      >
        구글 로그인
      </div>
      <div
        className={`${styles.loginFormElementDiv} ${styles.naverDiv} mt-2 d-flex justify-content-center align-items-center`}
      >
        네이버 로그인
      </div>
      <div
        className={`${styles.loginFormElementDiv}  mt-2 d-flex justify-content-center align-items-center`}
      >
        <div
          style={{
            height: 1,
            width: "100%",
            border: "1px solid rgb(227, 227, 227)",
          }}
        ></div>
      </div>
      <div
        className={`${styles.loginFormElementDiv} ${styles.inputStyle} mt-2 d-flex justify-content-center align-items-center`}
      >
        <InputGroup size="lg">
          <Form.Control
            name="email"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="이메일 주소"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </InputGroup>
      </div>
      <div
        className={`${styles.loginFormElementDiv} ${styles.inputStyle} mt-2 d-flex justify-content-center align-items-center`}
      >
        <InputGroup size="lg">
          <Form.Control
            name="passwd"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="비밀번호"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </InputGroup>
      </div>
      <div
        onClick={handleLogin}
        className={`${styles.loginFormElementDiv} ${styles.loginBtn} mt-2 d-flex justify-content-center align-items-center rounded`}
      >
        <span className={styles.loginBtnSpan}>로그인</span>
      </div>
      <div
        className={`${styles.loginFormElementDiv} mt-2 d-flex justify-content-center align-items-center`}
      >
        <span className={styles.PwdFindAndJoinSpan}>비밀번호 재설정</span>
        <div style={{ width: 80 }}></div>
        <Link to="/join/auth" className={`${styles.linkNoneStyle}`}>
          <span className={styles.PwdFindAndJoinSpan}>회원가입</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
