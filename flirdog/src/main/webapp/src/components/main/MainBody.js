import React from "react";
import "../../css/main/MainBody.css";
import Container from "react-bootstrap/esm/Container";
import MainIcon from "./MainIcon";
import { Link } from "react-router-dom";
import BestFlirdog from "./BestFlirdog";
import NavigateBtn from "./NavigateBtn";
import CommunityBtnContainer from "./CommunityBtnContainer";
import CommunityWriteBox from "./CommunityWriteBox";

const MainBody = () => {
  return (
    <>
      <img src="/image/main/main1.png" style={{ width: "100%" }} />
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
            btnHeight="10vh"
          ></NavigateBtn>
        </div>
      </div>
      <Container className="px-10">
        <div className="row mt-8">
          <CommunityBtnContainer></CommunityBtnContainer>
        </div>

        <div className="row mt-6">
          <CommunityWriteBox></CommunityWriteBox>
          <CommunityWriteBox></CommunityWriteBox>
          <CommunityWriteBox></CommunityWriteBox>
        </div>
        <div className="mt-7 d-flex justify-content-center align-items-center">
          <NavigateBtn
            text="커뮤니티 이동"
            url="/"
            fontSize="2.5vw"
            btnWidth="25vw"
            btnHeight="10vh"
          ></NavigateBtn>
        </div>
      </Container>
    </>
  );
};

export default MainBody;
