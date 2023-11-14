import React from "react";
import mainBody from "../../css/main/MainBody.module.css";

import Container from "react-bootstrap/esm/Container";

import NavigateBtn from "./NavigateBtn";

import MainScreen from "./1메인화면/MainScreen";
import BestFlirdog from "./2베스트플러독/BestFlirdog";
import SmallGroupMain from "./3강아지소모임/SmallGroupMain";
import CommunityMain from "./4커뮤니티/CommunityMain";
import BestProductMain from "./5인기상품/BestProductMain";

const MainBody = () => {
  return (
    <>
      <MainScreen></MainScreen>

      <Container className="px-10">
        <BestFlirdog />
      </Container>
      <SmallGroupMain></SmallGroupMain>
      <CommunityMain></CommunityMain>
      <Container className="px-10">
        <BestProductMain></BestProductMain>

        <div className="mt-7 d-flex justify-content-center align-items-center">
          <NavigateBtn
            text="쇼핑몰 이동"
            url="/product"
            fontSize="2.5vw"
            btnWidth="25vw"
            btnHeight="80px"
          ></NavigateBtn>
        </div>
      </Container>
    </>
  );
};

export default MainBody;
