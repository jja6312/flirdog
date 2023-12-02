import React, { useEffect, useState } from "react";
import login from "../../../css/login/login.module.css";
import { Form, InputGroup } from "react-bootstrap";
import axios from "axios";

import EmailButton from "../loginAPI/EmailButton";

const EmailInput = ({
  email,
  setEmail,
  isValidEmail,
  setIsValidEmail,
  isEmailCheck,
  setIsEmailCheck,
  setShowAuthKeyInput,
  setAuthCode,
}) => {
  const onInput = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = () => {
    setIsValidEmail(validateEmail(email));
    setIsEmailCheck(false);
    onCheckEmailIsExist(email);
  };

  useEffect(
    (e) => {
      if (email) {
        handleEmailChange(e);
      }
    },
    [email]
  );

  const onCheckEmailIsExist = () => {
    if (isValidEmail) {
      axios
        .post("http://localhost:8080/access/checkEmailIsExist", null, {
          params: {
            email: email,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data === true || !isValidEmail) {
            setIsEmailCheck(false);
          } else if (res.data === false && isValidEmail) {
            setIsEmailCheck(true);
          }
        });
    }
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
        <div className="d-flex justify-content-center align-items-center">
          <InputGroup size="lg" className={`mt-2`} style={{ width: "80%" }}>
            <Form.Control
              value={email}
              aria-label="Large"
              aria-describedby="inputGroup-sizing-lg"
              placeholder="이메일 주소 입력"
              isInvalid={!isValidEmail}
              onChange={onInput}
            />
          </InputGroup>

          <EmailButton
            email={email}
            isValidEmail={isValidEmail}
            setShowAuthKeyInput={setShowAuthKeyInput}
            setAuthCode={setAuthCode}
            isEmailCheck={isEmailCheck}
          ></EmailButton>
          {/* <div
            className={`mt-2 d-flex justify-content-center align-items-center rounded`}
            style={{
              width: "20%",
              height: "47px",
              backgroundColor: "#F56084",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
            onClick={}
          >
            <span className="text-white">인증</span>
          </div> */}
        </div>
        {!isValidEmail && email ? (
          <div
            style={{ color: "red", width: "100%", marginLeft: "15px" }}
            className={`d-flex justify-content-start`}
          >
            <span>잘못된 이메일 형식입니다</span>
          </div>
        ) : null}
        {isValidEmail && isEmailCheck && (
          <div
            style={{ color: "green", width: "100%", marginLeft: "15px" }}
            className={`d-flex justify-content-start`}
          >
            <span>사용 가능한 이메일입니다.</span>
          </div>
        )}
        {isValidEmail && !isEmailCheck && (
          <div
            style={{ color: "red", width: "100%", marginLeft: "15px" }}
            className={`d-flex justify-content-start`}
          >
            <span>이미 사용중인 이메일입니다.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailInput;
