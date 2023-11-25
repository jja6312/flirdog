import React, { useState } from "react";

import login from "../../../css/login/login.module.css";
import { Form, InputGroup } from "react-bootstrap";

const JoinAuth = () => {
  const [phone, setPhone] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isauthClicked, setIsAuthClicked] = useState(false); // 인증번호 전송 버튼을 눌렀는지 여부

  const handleSendAuthCode = async () => {
    if (!isValidPhoneNumber(phone)) {
      alert("휴대폰 형식이 아닙니다");
      return;
    }
    // 백엔드에 휴대폰 번호를 전송하고 인증번호를 요청하는 코드...
    setIsAuthClicked(true);
  };

  const verifyAuthCode = async () => {
    // 서버에 인증번호를 전송하고 검증하는 코드
  };

  const isValidPhoneNumber = (number) => {
    const regex = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    return regex.test(number);
  };

  return (
    <>
      <div
        className={`${login.loginForm} d-flex justify-content-start align-items-center flex-column`}
      >
        <div
          className={`${login.joinAuthForm} d-flex justify-content-start align-items-center flex-column`}
        >
          {/* fontsize를 조절하는 부트스트랩 */}
          <div
            className={`${login.loginFormElementDiv} mt-4 d-flex justify-content-center align-items-center`}
          ></div>
          <span className={login.JoinAuthFont1}>휴대폰 본인 확인</span>
          <span className={`${login.JoinAuthFont2} mt-3`}>
            원활한 서비스 제공을 위해, 휴대폰 번호를 입력해주세요.
          </span>
          <div
            style={{ width: "100%" }}
            className={`d-flex justhfi-content-start`}
          >
            <span className={`${login.JoinAuthFont3} mt-3`}>휴대폰번호</span>
          </div>
        </div>
        <div
          className={`${login.loginFormElementDiv} ${login.inputStyle} mt-2 d-flex justify-content-center align-items-center`}
        >
          <InputGroup size="lg" className={`mt-2`}>
            <Form.Control
              aria-label="Large"
              aria-describedby="inputGroup-sizing-lg"
              placeholder="휴대폰번호"
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputGroup>
        </div>
        <div
          className={`${
            login.loginFormElementDiv
          } mt-2 d-flex justify-content-center align-items-center rounded ${
            isValidPhoneNumber(phone) ? login.loginBtn : login.disabledBtn
          }`}
          onClick={handleSendAuthCode}
        >
          <span className={login.loginBtnSpan}>인증번호 전송</span>
        </div>
        {
          // 인증번호를 입력하는 부분
          isauthClicked ? (
            <>
              <div
                className={`${login.joinAuthForm} d-flex justify-content-start align-items-center flex-column`}
              >
                <div
                  style={{ width: "100%" }}
                  className={`d-flex justhfi-content-start`}
                >
                  <span className={`${login.JoinAuthFont3} mt-3`}>
                    인증번호
                  </span>
                </div>
              </div>

              <div
                className={`${login.loginFormElementDiv} ${login.inputStyle} mt-2 d-flex justify-content-center align-items-center`}
              >
                <InputGroup size="lg" className={`mt-2`}>
                  <Form.Control
                    aria-label="Large"
                    aria-describedby="inputGroup-sizing-lg"
                    placeholder="인증번호"
                    onChange={(e) => setAuthCode(e.target.value)}
                  />
                </InputGroup>
              </div>
              <div
                className={`${login.loginFormElementDiv} ${login.loginBtn} mt-2 d-flex justify-content-center align-items-center rounded`}
                onClick={verifyAuthCode}
              >
                <span className={`${login.loginBtnSpan}`}>확인</span>
              </div>
            </>
          ) : (
            <></>
          )
        }
      </div>
    </>
  );
};

export default JoinAuth;
