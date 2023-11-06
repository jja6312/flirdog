import React from "react";
import "../../css/main/MainBody.css";
import Container from "react-bootstrap/esm/Container";
import MainIcon from "./MainIcon";
import { Link } from "react-router-dom";
import BestFlirdog from "./BestFlirdog";
import NavigateBtn from "./NavigateBtn";
import CommunityBtnContainer from "./CommunityBtnContainer";

import ShoppingProduct from "./ShoppingProduct";
import Carousel from "react-bootstrap/Carousel";
import "../../css/main/MainCarousel.css";
import "../../css/main/Community.css";
import CommunityWrite from "./CommunityWrite";
import Button from "react-bootstrap/Button";

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
            <Link to="/" style={{ textDecoration: "none" }}>
              <MainIcon imgSrc="mainIcon3.png" imgText="쇼핑" />
            </Link>
          </div>
          <div className="col-lg-3 col-6 exam">
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
          <div className=" col-12 col-xl-6 communityWriteElementContainer">
            <div className="communityWriteElement">
              <CommunityWrite
                title="개떡ㅁㅌㅊ?ㅋㅋ"
                createdDate="1시간 전"
                author="시바이누"
                imgSrc="/image/main/exam/community1.png"
                number={1}
              ></CommunityWrite>
              <CommunityWrite
                title="점심나가서먹을것같아점심나가서먹을것같아점심나가서먹을것같아"
                createdDate="4시간 전"
                author="우리집개똥안먹어요"
                imgSrc="/image/main/exam/community2.png"
                number={2}
              ></CommunityWrite>
              <CommunityWrite
                title="우리집 꽃개 ㅋㅋ"
                createdDate="17시간 전"
                author="익명"
                imgSrc="/image/main/exam/community3.png"
                number={3}
              ></CommunityWrite>
              <CommunityWrite
                title="개죽이 근황"
                createdDate="1일 전"
                author="2000년에도사람이태어난다고"
                imgSrc="/image/main/exam/community4.png"
                number={4}
              ></CommunityWrite>
              <CommunityWrite
                title="떡으로 우리집개 피규어 만들었다"
                createdDate="2시간 전"
                author="잘만들었으면개추"
                imgSrc="/image/main/exam/community5.png"
                number={5}
              ></CommunityWrite>
            </div>
          </div>
          <div className=" col-12 col-xl-6 communityWriteElementContainer">
            <div className="communityWriteElement">
              <CommunityWrite
                title="인기글 도전한다"
                createdDate="3시간 전"
                author="시바이누"
                imgSrc="/image/main/exam/community6.png"
                number={6}
              ></CommunityWrite>
              <CommunityWrite
                title="우리집 강아지 너무 잘 먹음"
                createdDate="5시간 전"
                author="돼지개"
                imgSrc="/image/main/exam/community7.png"
                number={7}
              ></CommunityWrite>
              <CommunityWrite
                title="시바견 기엽누"
                createdDate="9시간 전"
                author="시바수바"
                imgSrc="/image/main/exam/community8.png"
                number={8}
              ></CommunityWrite>
              <CommunityWrite
                title="보신탕 맛집 리스트 공유합니다"
                createdDate="2시간 전"
                author="건강이최고"
                imgSrc="/image/main/exam/community9.png"
                number={9}
              ></CommunityWrite>
              <CommunityWrite
                title="울집 강아지 이정도면 잘생겼나요?"
                createdDate="5분 전"
                author="팔불출레전드"
                imgSrc="/image/main/exam/community10.png"
                number={10}
              ></CommunityWrite>
            </div>
          </div>
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
