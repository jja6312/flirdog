import React, { useState, useEffect, useContext } from "react";
import styles from "../../css/login/login.module.css";
import SocialKakao from "./loginAPI/SocialKaKao";
import { Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import ProductNoticeBanner from "../admin/1상품관리/ProductNoticeBanner";
import ModalBtn from "./ModalBtn";
import { Modal } from "react-bootstrap";
import StarPoint from "./join/StarPoint";
import NextBtn from "./NextBtn";
import ModalDogsInfo from "./ModalDogsInfo";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const Login = () => {
  const { showModal } = useParams();

  const [modalShow, setModalShow] = useState(false);
  const { login } = useContext(UserContext);
  const [credentials, setCredentials] = useState({
    email: "",
    passwd: "",
  });
  const [modaldogsInfo, setModalDogsInfo] = useState([]);
  const [currentDogIndex, setCurrentDogIndex] = useState(0); // 현재 표시되는 강아지의 인덱스
  const [isSatisfyForNextBtnAuth, setIsSatisfyForNextBtnAuth] = useState(false);
  const [score, setScore] = useState([false, false, false, false, false]);

  const submitScore = () => {
    axios
      .post("http://localhost:8080/access/saveDogScore", null, {
        params: {
          dogId: modaldogsInfo[currentDogIndex].id,
          score: score.filter(Boolean).length,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("별점제출에서 오류발생! 콘솔확인");
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials(() => ({
      ...credentials,
      [name]: value,
    }));
  };

  const handleNextDog = () => {
    if (isSatisfyForNextBtnAuth === false) {
      Swal.fire({
        icon: "error",
        title: "별점을 입력해주세요",
        showConfirmButton: false,
        timer: 700,
      });
      return;
    } else if (isSatisfyForNextBtnAuth === true) {
      setCurrentDogIndex((prev) => {
        if (prev < modaldogsInfo.length - 1) {
          return prev + 1;
        } else {
          return prev;
        }
      });
      setIsSatisfyForNextBtnAuth(false);

      submitScore();
    }
  };

  const handleComplete = async () => {
    await submitScore();
    setModalShow(false);
    setCurrentDogIndex(0);
  };

  useEffect(() => {
    if (showModal === "true") {
      setModalShow(true);
      alert(showModal);
    }
  }, [showModal]);

  useEffect(() => {
    console.log("credentials");
    console.log(credentials);
  }, [credentials]);

  //modalShow가 true이면 useEffect로 getFiveDogsInfo 를 가져온다.
  useEffect(() => {
    if (modalShow === false) {
      setIsSatisfyForNextBtnAuth(false);
    }
    if (modalShow) {
      //랜덤한 강아지 정보 불러오기
      axios
        .post("http://localhost:8080/access/getFiveDogsInfo")
        .then((res) => {
          setModalDogsInfo(res.data);
          console.log("modalDogsInifo");
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [modalShow]);

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
      <Modal
        size="lg"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <div className="d-flex justify-content-center align-items-start flex-column">
            <span style={{ fontSize: 30 }}>
              미모 투표({currentDogIndex + 1}/{modaldogsInfo.length})
            </span>
            <span style={{ color: "gray" }}>
              강아지 사진을 누르면 1:1채팅이 시작됩니다.
            </span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div
            className={`d-flex justify-content-center align-items-center flex-column`}
            style={{ width: "100%", height: 400 }}
          >
            <div
              className={`d-flex justify-content-center align-items-center`}
              style={{ width: "100%", height: 400 }}
            >
              <div
                className="d-flex justify-content-center align-items-center rounded"
                style={{ width: "60%", height: 400 }}
              >
                {modaldogsInfo.length > 0 && (
                  <img
                    className="rounded"
                    alt="강아지 사진"
                    src={modaldogsInfo[currentDogIndex].image}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
              <div style={{ width: "7%" }}></div>
              <div style={{ width: "20%" }}>
                {modaldogsInfo.length > 0 && (
                  <ModalDogsInfo
                    dog={modaldogsInfo[currentDogIndex]}
                  ></ModalDogsInfo>
                )}
              </div>
            </div>
          </div>

          <div
            className={`d-flex justify-content-center align-items-center flex-column`}
            style={{ width: "100%" }}
          >
            <div
              className="d-flex justify-content-center align-items-center flex-column"
              style={{ width: "100%" }}
            >
              <StarPoint
                score={score}
                setScore={setScore}
                currentDogIndex={currentDogIndex}
                setIsSatisfyForNextBtnAuth={setIsSatisfyForNextBtnAuth}
              ></StarPoint>
              {currentDogIndex < modaldogsInfo.length - 1 ? (
                <NextBtn
                  isSatisfyForNextBtnAuth={isSatisfyForNextBtnAuth}
                  text="다음"
                  onClick={handleNextDog}
                ></NextBtn>
              ) : (
                <NextBtn
                  isSatisfyForNextBtnAuth={isSatisfyForNextBtnAuth}
                  text="완료"
                  onClick={handleComplete}
                ></NextBtn>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <ModalBtn setModalShow={setModalShow}></ModalBtn>
    </div>
  );
};

export default Login;
