import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import login from "../../../css/login/login.module.css";
import { Form, InputGroup } from "react-bootstrap";

const AuthKeyInput = ({ authCode, setAuthTrue }) => {
  const [userInputAuthCode, setUserInputAuthCode] = useState(""); // 사용자 입력 인증코드 상태
  const [timer, setTimer] = useState(180); // 3분 (180초)

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      // 타이머 만료시 처리 로직
      // 예: 인증번호 만료 알림
    }
    return () => clearInterval(interval);
  }, [timer]);

  const onInput = (e) => {
    setUserInputAuthCode(e.target.value);
  };

  const handleAuthKeySubmit = () => {
    if (userInputAuthCode === authCode) {
      Swal.fire({
        title: "인증 성공!",
        position: "top",
        timer: 700,
        showConfirmButton: false,
      });
      setAuthTrue(true);
    } else {
      Swal.fire({
        title: "인증 실패",
        text: "올바르지 않은 인증번호입니다.",
        icon: "error",
        position: "top",
        timer: 700,
        showConfirmButton: false,
      });
      // 실패 처리 로직
    }
  };

  return (
    <div
      className={`${login.joinAuthForm} d-flex justify-content-start align-items-center flex-column`}
    >
      <div
        style={{ width: "100%" }}
        className={`d-flex justify-content-start aling-items-center`}
      >
        <span className={`${login.JoinAuthFont3} mt-3`}>인증번호</span>
        {/* 타이머 */}
        {timer > 0 ? (
          <span className="mt-3" style={{ color: "red", marginLeft: 15 }}>
            0{Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}
          </span>
        ) : (
          <span className="mt-3" style={{ color: "red", marginLeft: 15 }}>
            인증번호 만료
          </span>
        )}
      </div>

      <div
        className={`${login.loginFormElementDiv} ${login.inputStyle} mt-2 d-flex justify-content-center align-items-center flex-column`}
      >
        <div className="d-flex justify-content-center align-items-center">
          <InputGroup size="lg" className={`mt-2`} style={{ width: "80%" }}>
            <Form.Control
              onChange={onInput}
              aria-label="Large"
              aria-describedby="inputGroup-sizing-lg"
              placeholder="인증키 6자리를 입력하세요"
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
            onClick={handleAuthKeySubmit}
          >
            <span className="text-white">확인</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthKeyInput;
