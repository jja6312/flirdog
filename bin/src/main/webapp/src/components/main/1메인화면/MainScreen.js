import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/esm/Container";
import NavigateBtn from "../NavigateBtn";
import MainIcon from "./MainIcon";
import { Link } from "react-router-dom";

import mainCarousel from "../../../css/main/1메인화면/mainCarousel.module.css";

const MainScreen = () => {
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
            url="/"
            fontSize="2vw"
            btnWidth="22vw"
            btnHeight="70px"
            theme="pink"
            opacity="0.8"
          ></NavigateBtn>
          <div style={{ height: 15 }}></div>
          <NavigateBtn
            text="주변 애견 매칭"
            url="/"
            fontSize="2vw"
            btnWidth="22vw"
            btnHeight="70px"
            theme="white"
            opacity="0.8"
          ></NavigateBtn>
        </div>
      </div>
      <Container className="px-10">
        <div className="row">
          <div className="col-lg-3 col-6 exam">
            <Link to="/" style={{ textDecoration: "none" }}>
              <MainIcon imgSrc="mainIcon1.png" imgText="애견 매칭" />
            </Link>
          </div>
          <div className="col-lg-3 col-6 exam">
            <Link to="/" style={{ textDecoration: "none" }}>
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
    </div>
  );
};

export default MainScreen;
