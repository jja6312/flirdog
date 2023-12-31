import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/esm/Container";
import NavigateBtn from "../NavigateBtn";
import MainIcon from "./MainIcon";
import { Link } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";

import mainCarousel from "../../../css/main/1메인화면/mainCarousel.module.css";
import ModalGoMatching from "../../login/ModalGoMatching";

const MainScreen = () => {
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

  return (
    <div>
      <Carousel data-bs-theme="white">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/image/main/main1.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/image/main/main2.png"
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>
      <img alt="" src="" style={{ width: "100%" }} />
      <div className={mainCarousel.carouselNavigateBtnContainer}>
        <div className={mainCarousel.carouselNavigateBtnAbsolute}>
          <NavigateBtn
            text="매칭 등록"
            url="/date/dateWrite"
            fontSize="2vw"
            btnWidth="22vw"
            btnHeight="70px"
            theme="pink"
            opacity="0.8"
          ></NavigateBtn>
          <div style={{ height: 15 }}></div>

          <NavigateBtn
            text="주변 애견 매칭"
            fontSize="2vw"
            btnWidth="22vw"
            btnHeight="70px"
            theme="white"
            opacity="0.8"
            url="modal"
            setModalShow={setModalShow}
          ></NavigateBtn>
        </div>
      </div>
      <Container className="px-10">
        <div className="row">
          <div className="col-lg-3 col-6 exam">
            <Link to="/date/dateList" style={{ textDecoration: "none" }}>
              <MainIcon imgSrc="mainIcon1.png" imgText="애견 매칭" />
            </Link>
          </div>
          <div className="col-lg-3 col-6 exam">
            <Link to="/somoim" style={{ textDecoration: "none" }}>
              <MainIcon imgSrc="mainIcon2.png" imgText="소모임" />
            </Link>
          </div>
          <div className="col-lg-3 col-6 exam">
            <Link to="/product" style={{ textDecoration: "none" }}>
              <MainIcon imgSrc="mainIcon3.png" imgText="쇼핑" />
            </Link>
          </div>
          <div className="col-lg-3 col-6 exam">
            <Link to="/" style={{ textDecoration: "none" }}>
              <MainIcon imgSrc="mainIcon4.png" imgText="커뮤니티" />
            </Link>
          </div>
        </div>
      </Container>

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

      {/*ModalGoMatching.code.end ----------------------------------- */}
    </div>
  );
};

export default MainScreen;
