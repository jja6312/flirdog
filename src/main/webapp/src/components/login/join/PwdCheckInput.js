import React, { useState } from "react";
import login from "../../../css/login/login.module.css";
import { Form, InputGroup } from "react-bootstrap";

const PwdCheckInput = ({
  setPasswordCheck,
  password,
  passwordCheck,
  isPasswordMatch,
  setIsPasswordMatch,
}) => {
  const handlePasswordCheckChange = (e) => {
    const passwordCheckInput = e.target.value;
    setPasswordCheck(passwordCheckInput);
    setIsPasswordMatch(password === passwordCheckInput);
  };
  return (
    <>
      <div
        className={`${login.joinAuthForm} d-flex justify-content-start align-items-center flex-column`}
      >
        {/* fontsize를 조절하는 부트스트랩 */}

        <div
          style={{ width: "100%" }}
          className={`d-flex justhfi-content-start`}
        >
          <span className={`${login.JoinAuthFont3} mt-3`}>비밀번호 확인</span>
        </div>
      </div>
      <div
        className={`${login.loginFormElementDiv} ${login.inputStyle} mt-2 d-flex justify-content-center align-items-center flex-column`}
      >
        <InputGroup size="lg" className={`mt-2`}>
          <Form.Control
            onChange={handlePasswordCheckChange}
            aria-label="Large"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="비밀번호 입력"
            isInvalid={!isPasswordMatch && passwordCheck}
            type="password"
          />
        </InputGroup>
        <div
          style={{ color: "red", width: "100%" }}
          className={`d-flex justify-content-start`}
        >
          {!isPasswordMatch && passwordCheck ? (
            <span>비밀번호가 일치하지 않습니다.</span>
          ) : (
            <div style={{ height: "24px" }}></div>
          )}
        </div>
      </div>
    </>
  );
};

export default PwdCheckInput;
