import React, { useState } from "react";
import login from "../../../css/login/login.module.css";
import { Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const PwdFind = () => {
  const [email, setEmail] = useState("");

  const onInput = (e) => {
    setEmail(e.target.value);
  };

  const isExistEmail = () => {
    axios.post("http://localhost:8080/access/isExistEmail", null, {
      params: { email },
    });
  };

  return (
    <>
      <div
        className={`${login.loginForm} 
          justify-content-start align-items-center flex-column`}
      >
        <div
          className={`${login.joinAuthForm} d-flex justify-content-start align-items-center flex-column`}
        >
          {/* fontsize를 조절하는 부트스트랩 */}
          <div
            className={`${login.loginFormElementDiv} mt-4 d-flex justify-content-center align-items-center`}
          ></div>
          <span className={login.JoinAuthFont1}>비밀번호 재설정</span>
          <span className={`${login.JoinAuthFont2} mt-3`}>
            회원가입 시 등록한 이메일 주소를 입력해 주세요.
          </span>
          <div
            style={{ width: "100%" }}
            className={`d-flex justhfi-content-start`}
          >
            <span className={`${login.JoinAuthFont3} mt-3`}>이메일</span>
          </div>
        </div>
        <div
          className={`${login.loginFormElementDiv} ${login.inputStyle} mt-2 d-flex justify-content-center align-items-center`}
        >
          <InputGroup size="lg" className={`mt-2`}>
            <Form.Control
              name="email"
              onChange={onInput}
              aria-label="Large"
              aria-describedby="inputGroup-sizing-lg"
              placeholder="이메일을 입력하세요."
            />
          </InputGroup>
        </div>
        <div
          className={`${login.loginFormElementDiv} ${login.loginBtn} mt-2 d-flex justify-content-center align-items-center rounded`}
          onClick={isExistEmail}
        >
          <span className={login.loginBtnSpan}>확인</span>
        </div>
      </div>
    </>
  );
};

export default PwdFind;
