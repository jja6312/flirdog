import React from "react";
import BestFlirdogImg from "./BestFlirdogImg";
import NavigateBtn from "../NavigateBtn";

import CategoryBtnContainer from "../CategoryBtnContainer";
import styles from "../../../css/main/2베스트플러독/navigateBtn.module.css";

const BestFlirdog = ({ userInfoArray, dogsInfoArray }) => (
  <>
    <div className="row mt-10 mx-2">
      <div className="col-12">
        <img
          alt=""
          className="bestFlirdogTitle"
          src="/image/main/bestFlirdog1.png"
        />
      </div>
    </div>
    <div className="row mt-8">
      <CategoryBtnContainer></CategoryBtnContainer>
    </div>
    <div className="row mt-8 d-flex justify-content-between">
      <BestFlirdogImg
        srcImg={
          dogsInfoArray[0]
            ? dogsInfoArray[0].image
            : "/image/nullImage/nullImage2.png"
        }
        text={userInfoArray[0] ? userInfoArray[0].communityScore : "0"}
      />
      <BestFlirdogImg srcImg="/image/main/dog2.jpg" text="784" />
      <BestFlirdogImg srcImg="/image/main/dog3.jpg" text="654" />
    </div>
    <div className={`${styles.navigateBtnContainer} mt-8`}>
      <NavigateBtn
        text="등록하러 가기"
        url="/"
        fontSize="2.5vw"
        btnWidth="40vw"
        btnHeight="80px "
      ></NavigateBtn>
    </div>
  </>
);

export default BestFlirdog;
