import React, { useState, useEffect, useContext } from "react";
import styles from "../../css/login/login.module.css";
import SocialKakao from "./loginAPI/SocialKaKao";
import { Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
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
import ModalGoMatching from "./ModalGoMatching";

const Login = () => {
  const navigate = useNavigate();
  const { showModal } = useParams();
  const { login } = useContext(UserContext);

  // ModalGoMatching.config.start----------------------------------------------
  const [credentials, setCredentials] = useState({
    email: "",
    passwd: "",
  });
  const [modalShow, setModalShow] = useState(false);
  const [modaldogsInfo, setModalDogsInfo] = useState([]);
  const [modalMatchingTable, setModalMatchingTable] = useState([]);
  const [modalUserInfo, setModalUserInfo] = useState([]);
  const [currentDogIndex, setCurrentDogIndex] = useState(0); // 현재 표시되는 강아지의 인덱스
  const [isSatisfyForNextBtnAuth, setIsSatisfyForNextBtnAuth] = useState(false);
  const [score, setScore] = useState([false, false, false, false, false]);
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
  const submitScore = () => {
    axios
      .post("https://java.flirdog.store:8080/access/saveDogScore", null, {
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

  useEffect(() => {
    const fetchData = async () => {
      if (modalShow) {
        try {
          const res1 = await axios.post(
            "https://java.flirdog.store:8080/access/getFiveDogsInfo"
          );
          const dogsInfoData = res1.data;
          setModalDogsInfo(dogsInfoData);

          const userInfoPromises = dogsInfoData.map((dog) =>
            axios.post(
              "https://java.flirdog.store:8080/access/getUserInfoAsDogId",
              null,
              {
                params: { dogId: dog.id },
              }
            )
          );

          const userInfos = await Promise.all(userInfoPromises);
          setModalUserInfo(userInfos.map((res) => res.data));

          const matchingInfoPromises = userInfos.map((res, i) =>
            axios.post("https://java.flirdog.store:8080/access/getMatchingTable", null, {
              params: {
                dogName: dogsInfoData[i].name,
                userId: res.data.id,
              },
            })
          );

          const matchingInfos = await Promise.all(matchingInfoPromises);

          setModalMatchingTable(matchingInfos.map((res) => res.data));
        } catch (err) {
          console.log("모달 중 매칭데이터 불러오다 에러: " + err);
        }
      }
    };

    fetchData();
  }, [modalShow]);

  useEffect(() => {
    console.log("모달매칭테이블: ", modalMatchingTable);
  }, [modalMatchingTable]);

  // ModalGoMatching.config.end--------------------------------------------------------

  useEffect(() => {
    if (showModal === "true") {
      setModalShow(true);
    }
  }, [showModal]);

  useEffect(() => {
    console.log("credentials");
    console.log(credentials);
  }, [credentials]);

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
            type="password"
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
        <span
          className={styles.PwdFindAndJoinSpan}
          onClick={() => navigate("/pwdFind")}
        >
          비밀번호 재설정
        </span>
        <div style={{ width: 80 }}></div>
        <Link to="/join/auth" className={`${styles.linkNoneStyle}`}>
          <span className={styles.PwdFindAndJoinSpan}>회원가입</span>
        </Link>
      </div>
      {/* ModalGoMatching.code.start------------------------- */}
      <ModalGoMatching
        modalShow={modalShow}
        setModalShow={setModalShow}
        modaldogsInfo={modaldogsInfo}
        currentDogIndex={currentDogIndex}
        isSatisfyForNextBtnAuth={isSatisfyForNextBtnAuth}
        setIsSatisfyForNextBtnAuth={setIsSatisfyForNextBtnAuth}
        score={score}
        setScore={setScore}
        handleNextDog={handleNextDog}
        handleComplete={handleComplete}
        modalUserInfo={modalUserInfo}
        modalMatchingTable={modalMatchingTable}
      ></ModalGoMatching>
      <ModalBtn setModalShow={setModalShow}></ModalBtn>
      {/*ModalGoMatching.code.end ----------------------------------- */}
    </div>
  );
};

export default Login;
