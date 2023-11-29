import React, { useState } from "react";
import login from "../../../css/login/login.module.css";
import { Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const EmailInput = ({
  setEmail,
  isValidEmail,
  setIsValidEmail,
  setIsEmailCheck,
}) => {
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
    setIsEmailCheck(false);
  };

  const onCheckEmailIsExist = () => {
    axios
      .post("http://localhost:8080/access/checkEmailIsExist", null, {
        params: {
          email: email,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data === true || !isValidEmail) {
          Swal.fire({
            icon: "error",
            title: "이미 존재하거나 잘못된 이메일 형식입니다.",
            text: "다른 이메일을 입력해주세요.",
            showConfirmButton: false,
            timer: 800,
            position: "top",
          });
        } else if (res.data === false && isValidEmail) {
          setIsEmailCheck(true);
          Swal.fire({
            icon: "success",
            title: "사용 가능한 이메일입니다.",
            text: "다음 단계로 넘어가주세요.",
            showConfirmButton: false,
            timer: 800,
            position: "top",
          });
        }
      });
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
              onChange={handleEmailChange}
              aria-label="Large"
              aria-describedby="inputGroup-sizing-lg"
              placeholder="이메일 주소를 입력해주세요."
              isInvalid={!isValidEmail}
            />
          </InputGroup>
          <div
            className={`mt-2 d-flex justify-content-center align-items-center rounded`}
            style={{
              width: "20%",
              height: "47px",
              backgroundColor: "#F56084",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
            onClick={onCheckEmailIsExist}
          >
            <span className="text-white">확인</span>
          </div>
        </div>
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
