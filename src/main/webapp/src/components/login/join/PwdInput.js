import React, { useState } from "react";
import login from "../../../css/login/login.module.css";
import { Form, InputGroup } from "react-bootstrap";

const PwdInput = ({ setPassword, isValidPassword, setIsValidPassword }) => {
  const [password, setPasswordLocal] = useState("");

  const validatePassword = (password) => {
    const regex = /^(?=.*[!@#$%^&*])(?=.{10,})/;
    return regex.test(password);
  };

  const handlePasswordChange = (e) => {
    const passwordInput = e.target.value;
    setPasswordLocal(passwordInput);
    setPassword(passwordInput);
    setIsValidPassword(validatePassword(passwordInput));
  };
  return (
    <div>
      <div
        className={`${login.joinAuthForm} d-flex justify-content-start align-items-center flex-column`}
      >
        <div
          style={{ width: "100%" }}
          className={`d-flex justhfi-content-start`}
        >
          <span className={`${login.JoinAuthFont3} mt-3`}>비밀번호</span>
        </div>
      </div>
      <div
        className={`${login.loginFormElementDiv} ${login.inputStyle} mt-2 d-flex justify-content-center align-items-center flex-column`}
      >
        <InputGroup size="lg" className={`mt-2`}>
          <Form.Control
            value={password}
            onChange={handlePasswordChange}
            aria-label="Large"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="비밀번호 입력"
            type="password"
          />
        </InputGroup>
        <div
          style={{ color: "red", width: "100%" }}
          className={`d-flex justify-content-start`}
        >
          {!isValidPassword && password ? (
            <span>특수문자를 포함한 10글자 이상을 입력해주세요.</span>
          ) : (
            <div style={{ height: "24px" }}></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PwdInput;
