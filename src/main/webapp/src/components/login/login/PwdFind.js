import React, { useEffect, useState } from "react";
import login from "../../../css/login/login.module.css";
import { Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthKeyInput from "../join/AuthKeyInput";
import EmailButton from "../loginAPI/EmailButton";
import Swal from "sweetalert2";
import Header from "../../main/Header";

const PwdFind = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [passwdCheck, setPasswdCheck] = useState("");

  const [authCode, setAuthCode] = useState("");
  const [showAuthKeyInput, setShowAuthKeyInput] = useState(false);
  const [isClickNext, setIsClickNext] = useState(false);
  const [authTrue, setAuthTrue] = useState(false);

  const [satisfyAllCondition2, setSatisfyAllCondition2] = useState(false);

  const onInput = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "passwd") {
      setPasswd(e.target.value);
    } else if (e.target.name === "passwdCheck") {
      setPasswdCheck(e.target.value);
    }
  };

  const handleSendAuthCode = async () => {
    if (authTrue === false) {
      Swal.fire({
        icon: "error",
        title: "인증을 완료해주세요.",
        position: "top",
        timer: 700,
        showConfirmButton: false,
      });
      return;
    }

    setIsClickNext(true);
  };

  const handleSendAuthCode2 = async () => {
    if (passwd !== passwdCheck) {
      Swal.fire({
        icon: "error",
        title: "비밀번호가 일치하지 않습니다.",
        position: "top",
        timer: 700,
        showConfirmButton: false,
      });
      return;
    }

    if (satisfyAllCondition2 === false) {
      Swal.fire({
        icon: "error",
        title: "비밀번호 조건을 확인해주세요.",
        position: "top",
        timer: 700,
        showConfirmButton: false,
      });
      return;
    }

    await axios
      .post("https://java.flirdog.store:8080/access/updatePwd", null, {
        params: {
          email: email,
          passwd: passwd,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "비밀번호가 변경되었습니다.",
          position: "top",
          timer: 700,
          showConfirmButton: false,
        });
        navigate("/login");
      })
      .catch((error) => {
        console.error("비밀번호 변경 실패:", error);
        Swal.fire({
          icon: "error",
          title: "비밀번호 변경에 실패하였습니다.",
          //에러출력
          text: error.response.data.message,
          position: "top",
          timer: 700,
          showConfirmButton: false,
        });
      });
  };
  useEffect(() => {
    console.log(passwd);
    console.log(passwdCheck);
    console.log(satisfyAllCondition2);

    if (
      passwd.length >= 10 &&
      (passwd.includes("!") ||
        passwd.includes("@") ||
        passwd.includes("#") ||
        passwd.includes("$") ||
        passwd.includes("%") ||
        passwd.includes("^") ||
        passwd.includes("&") ||
        passwd.includes("*") ||
        passwd.includes("(") ||
        passwd.includes(")")) &&
      passwd === passwdCheck
    ) {
      setSatisfyAllCondition2(true);
    } else {
      setSatisfyAllCondition2(false);
    }
  }, [passwd, passwdCheck]);

  return (
    <>
      <Header></Header>
      <div
        className={`${login.loginForm} 
        ${isClickNext ? login.slideOutLeft : ""}
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
          <InputGroup size="lg" className={`mt-2`} style={{ width: "80%" }}>
            <Form.Control
              name="email"
              onChange={onInput}
              aria-label="Large"
              aria-describedby="inputGroup-sizing-lg"
              placeholder="이메일을 입력하세요."
            />
          </InputGroup>
          <EmailButton
            email={email}
            isValidEmail={true}
            setShowAuthKeyInput={setShowAuthKeyInput}
            setAuthCode={setAuthCode}
            isEmailCheck={true}
          ></EmailButton>
        </div>

        {showAuthKeyInput && (
          <AuthKeyInput
            authCode={authCode}
            setAuthTrue={setAuthTrue}
          ></AuthKeyInput>
        )}
        <div
          className={`${
            login.loginFormElementDiv
          } mt-4 d-flex justify-content-center align-items-center rounded ${
            authTrue ? login.loginBtn : login.disabledBtn
          }`}
          onClick={handleSendAuthCode}
        >
          <span className={login.loginBtnSpan}>다음</span>
        </div>
      </div>

      {/* ----------------- 새 비밀번호 입력 페이지 ---------------------- */}

      {isClickNext && (
        <div
          className={`${login.loginForm} ${
            isClickNext ? login.slideInRight : ""
          } 
          d-flex justify-content-start align-items-center flex-column`}
        >
          <div
            className={`${login.joinAuthForm} d-flex justify-content-start align-items-center flex-column`}
          >
            {/* fontsize를 조절하는 부트스트랩 */}
            <div
              className={`${login.loginFormElementDiv} mt-4 d-flex justify-content-center align-items-center`}
            ></div>
            <span className={login.JoinAuthFont1}>새로운 비밀번호 입력</span>
            <span className={`${login.JoinAuthFont2} mt-3`}>
              10글자 이상, 특수문자를 포함해야해요!
            </span>
            <div
              style={{ width: "100%" }}
              className={`d-flex justhfi-content-start`}
            >
              <span className={`${login.JoinAuthFont3} mt-3`}>비밀번호</span>
            </div>
          </div>
          <div
            className={`${login.loginFormElementDiv} ${login.inputStyle} mt-2 d-flex justify-content-center align-items-center`}
          >
            <InputGroup size="lg" className={`mt-2`}>
              <Form.Control
                name="passwd"
                aria-label="Large"
                aria-describedby="inputGroup-sizing-lg"
                placeholder="비밀번호"
                onChange={onInput}
                type="password"
              />
            </InputGroup>
          </div>
          <div
            className={`${login.joinAuthForm} d-flex justify-content-start align-items-center flex-column`}
          >
            <div
              style={{ width: "100%" }}
              className={`d-flex justhfi-content-start`}
            >
              <span className={`${login.JoinAuthFont3} mt-3`}>
                비밀번호 확인
              </span>
            </div>
            <div
              className={`${login.loginFormElementDiv} ${login.inputStyle} mt-2 d-flex justify-content-center align-items-center`}
            >
              <InputGroup size="lg" className={`mt-2`}>
                <Form.Control
                  name="passwdCheck"
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-lg"
                  placeholder="비밀번호 확인"
                  onChange={onInput}
                  type="password"
                />
              </InputGroup>
            </div>
          </div>

          <div
            className={`${
              login.loginFormElementDiv
            } mt-2 d-flex justify-content-center align-items-center rounded ${
              satisfyAllCondition2 ? login.loginBtn : login.disabledBtn
            }`}
            onClick={handleSendAuthCode2}
          >
            <span className={login.loginBtnSpan}>비밀번호 변경</span>
          </div>
        </div>
      )}
    </>
  );
};

export default PwdFind;
