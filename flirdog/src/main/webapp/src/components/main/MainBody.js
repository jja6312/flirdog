import React from "react";
import "../../css/main/MainBody.css";
import Container from "react-bootstrap/esm/Container";
import MainIcon from "./MainIcon";
import { Link } from "react-router-dom";
import BestFlirdog from "./BestFlirdog";
import NavigateBtn from "./NavigateBtn";
import CommunityBtnContainer from "./CommunityBtnContainer";
import CommunityWriteBox from "./CommunityWriteBox";
import ShoppingProduct from "./ShoppingProduct";
import Carousel from "react-bootstrap/Carousel";
import "../../css/main/MainCarousel.css";

const MainBody = () => {
  return (
    <>
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
      <img src="" style={{ width: "100%" }} />
      <div className="carousel--NavigateBtnContainer">
        <div className="carousel--NavigateBtnAbsolute">
          <NavigateBtn
            text="매칭 등록"
            url="/"
            fontSize="2vw"
            btnWidth="22vw"
            btnHeight="70px"
            theme="pink"
            // absolute="true"
            // absoluteTop="35vh"
            // absoluteRight="50px"
            opacity="0.9"
          ></NavigateBtn>
          <div style={{ height: 15 }}></div>
          <NavigateBtn
            text="주변 애견 매칭"
            url="/"
            fontSize="2vw"
            btnWidth="22vw"
            btnHeight="70px"
            theme="white"
            // absolute="true"
            // absoluteTop="47vh"
            // absoluteBottom="0px"
            // absoluteRight="50px"
            opacity="0.8"
          ></NavigateBtn>
        </div>
      </div>
      <Container className="px-10">
        <div className="row">
          <div className="col-lg-3 col-6">
            <Link to="/" style={{ textDecoration: "none" }}>
              <MainIcon imgSrc="mainIcon1.png" imgText="애견 매칭" />
            </Link>
          </div>
          <div className="col-lg-3 col-6">
            <Link to="/" style={{ textDecoration: "none" }}>
              <MainIcon imgSrc="mainIcon2.png" imgText="소모임" />
            </Link>
          </div>
          <div className="col-lg-3 col-6">
            <Link to="/" style={{ textDecoration: "none" }}>
              <MainIcon imgSrc="mainIcon3.png" imgText="쇼핑" />
            </Link>
          </div>
          <div className="col-lg-3 col-6">
            <Link to="/" style={{ textDecoration: "none" }}>
              <MainIcon imgSrc="mainIcon4.png" imgText="커뮤니티" />
            </Link>
          </div>
        </div>
        <BestFlirdog></BestFlirdog>
      </Container>
      <div className="dogSmallGroup mt-10">
        <img
          src="/image/main/mainDogSmallGroup.png"
          style={{ width: "100%" }}
        />
        <div style={{ position: "absolute", top: "70%", left: "10%" }}>
          <NavigateBtn
            text="등록하러 가기"
            url="/"
            fontSize="2.5vw"
            btnWidth="25vw"
            btnHeight="80px"
          ></NavigateBtn>
        </div>
      </div>
      <Container className="px-10">
        <div className="row mt-8">
          <CommunityBtnContainer></CommunityBtnContainer>
        </div>

        <div className="row mt-1">
          <CommunityWriteBox></CommunityWriteBox>
          <CommunityWriteBox></CommunityWriteBox>
        </div>
        <div className="mt-7 d-flex justify-content-center align-items-center">
          <NavigateBtn
            text="커뮤니티 이동"
            url="/"
            fontSize="2.5vw"
            btnWidth="25vw"
            btnHeight="80px"
          ></NavigateBtn>
        </div>
        <div className="d-flex justify-content-center mt-10 flex-column">
          <span className="" style={{ width: "100%", fontSize: 40 }}>
            인기 상품
          </span>
          <div className="row mt-5">
            <ShoppingProduct imgSrc="/image/main/exam/exam1.jpg"></ShoppingProduct>
            <ShoppingProduct imgSrc="/image/main/exam/exam2.jpg"></ShoppingProduct>
            <ShoppingProduct imgSrc="/image/main/exam/exam3.jpg"></ShoppingProduct>
            <ShoppingProduct imgSrc="/image/main/exam/exam4.jpg"></ShoppingProduct>
          </div>
          <div className="row">
            <ShoppingProduct imgSrc="/image/main/exam/exam5.jpg"></ShoppingProduct>
            <ShoppingProduct imgSrc="/image/main/exam/exam6.jpg"></ShoppingProduct>
            <ShoppingProduct imgSrc="/image/main/exam/exam7.jpg"></ShoppingProduct>
            <ShoppingProduct imgSrc="/image/main/exam/exam8.jpg"></ShoppingProduct>
          </div>
        </div>
      </Container>
      <div className="mt-7 d-flex justify-content-center align-items-center">
        <NavigateBtn
          text="쇼핑몰 이동"
          url="/"
          fontSize="2.5vw"
          btnWidth="25vw"
          btnHeight="80px"
        ></NavigateBtn>
      </div>
    </>
  );
};

export default MainBody;
