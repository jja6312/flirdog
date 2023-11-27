import React, { useState } from "react";
import login from "../../../css/login/login.module.css";
import { Form, InputGroup } from "react-bootstrap";

const EmailInput = ({ setEmail, isValidEmail, setIsValidEmail }) => {
  const [email, setEmailLocal] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const emailInput = e.target.value;
    setEmailLocal(emailInput);
    setEmail(emailInput);
    setIsValidEmail(validateEmail(emailInput));
  };

  return (
    <div
      className={`${login.joinAuthForm} d-flex justify-content-start align-items-center flex-column`}
    >
      {/* fontsize를 조절하는 부트스트랩 */}
      <div
        className={`${login.loginFormElementDiv} d-flex justify-content-center align-items-center`}
      ></div>

      <span className={login.JoinAuthFont1}>회원 가입</span>
      <div style={{ width: "100%" }} className={`d-flex justhfi-content-start`}>
        <span className={`${login.JoinAuthFont3} mt-3`}>이메일 아이디</span>
      </div>
      <div
        className={`${login.loginFormElementDiv} ${login.inputStyle} mt-2 d-flex justify-content-center align-items-center flex-column`}
      >
        <InputGroup size="lg" className={`mt-2`}>
          <Form.Control
            value={email}
            onChange={handleEmailChange}
            aria-label="Large"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="이메일 주소를 입력해주세요."
            isInvalid={!isValidEmail}
          />
        </InputGroup>
        <div
          style={{ color: "red", width: "100%" }}
          className={`d-flex justify-content-start`}
        >
          {!isValidEmail && email ? (
            <span>잘못된 이메일 형식입니다</span>
          ) : (
            <div style={{ height: "24px" }}></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailInput;
