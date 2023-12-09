import React from "react";
import BestFlirdogImg from "./BestFlirdogImg";
import NavigateBtn from "../NavigateBtn";

import CategoryBtnContainer from "../CategoryBtnContainer";
import styles from "../../../css/main/2베스트플러독/navigateBtn.module.css";
import bestFlirdog from "../../../css/main/2베스트플러독/bestFlirdog.module.css";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import CheckBtn from "../../admin/1상품관리/CheckBtn";
import checkBtnStyle from "../../../css/admin/checkBtn.module.css";

const BestFlirdog = ({
  userInfoArray,
  dogsInfoArray,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  openChatting,
  selectedRadio,
  setSelectedRadio,
}) => {
  return (
    <>
      <div className="row mt-10 mx-2">
        <div className="col-12">
          <img
            alt=""
            className={bestFlirdog.bestFlirdogTitle}
            src="/image/main/bestFlirdog1.png"
          />
        </div>
      </div>
      <div className="row mt-8 d-flex">
        <CategoryBtnContainer
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        ></CategoryBtnContainer>
        <div className="d-flex justify-content-center align-items-center mt-4 mr-4">
          <div
            className="mx-4 d-flex align-items-center"
            onClick={() => {
              setSelectedRadio("미모 점수 높은 순");
            }}
          >
            {selectedRadio === "미모 점수 높은 순" ? (
              <svg
                className={`${checkBtnStyle.checkBtn} mx-2`}
                onClick={() => setSelectedRadio("미모 점수 높은 순")}
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
              </svg>
            ) : (
              <div
                className={`${checkBtnStyle.checkBtnDiv} mx-2`}
                onClick={() => setSelectedRadio("미모 점수 높은 순")}
              ></div>
            )}
            <span>미모 점수 높은 순</span>
          </div>
          <div
            className="mx-4 d-flex align-items-center"
            onClick={() => {
              setSelectedRadio("커뮤니티 점수 높은 순");
            }}
          >
            {selectedRadio === "커뮤니티 점수 높은 순" ? (
              <svg
                className={`${checkBtnStyle.checkBtn} mx-2 `}
                onClick={() => setSelectedRadio("커뮤니티 점수 높은 순")}
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
              </svg>
            ) : (
              <div
                className={`${checkBtnStyle.checkBtnDiv} mx-2`}
                onClick={() => setSelectedRadio("커뮤니티 점수 높은 순")}
              ></div>
            )}
            <span>커뮤니티 점수 높은 순</span>
          </div>
        </div>
      </div>
      <div className="row mt-8 d-flex justify-content-between">
        <BestFlirdogImg
          userInfoArray={userInfoArray}
          dogsInfoArray={dogsInfoArray}
          currentIndex="0"
          openChatting={openChatting}
          selectedRadio={selectedRadio}
          fillCrown="gold"
        />

        <BestFlirdogImg
          userInfoArray={userInfoArray}
          dogsInfoArray={dogsInfoArray}
          currentIndex="1"
          openChatting={openChatting}
          selectedRadio={selectedRadio}
          fillCrown="#B3B3B3"
        />

        <BestFlirdogImg
          userInfoArray={userInfoArray}
          dogsInfoArray={dogsInfoArray}
          currentIndex="2"
          openChatting={openChatting}
          selectedRadio={selectedRadio}
          fillCrown="#C9673B"
        />
      </div>
      <div className={`${styles.navigateBtnContainer} mt-8`}>
        <NavigateBtn
          text="등록하러 가기"
          url="/date/dateWrite"
          fontSize="2.5vw"
          btnWidth="40vw"
          btnHeight="80px "
        ></NavigateBtn>
      </div>
    </>
  );
};

export default BestFlirdog;
