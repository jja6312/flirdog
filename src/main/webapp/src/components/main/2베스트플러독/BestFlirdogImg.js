import React, { useEffect, useState } from "react";
import BestFlirdogPinkLikeBtn from "./BestFlirdogPinkLikeBtn";
import styles from "../../../css/main/2베스트플러독/bestFlirdog.module.css";
import moveUpDown from "../../../css/admin/1상품관리/productNoticeBanner.module.css";

const BestFlirdogImg = ({
  userInfoArray,
  dogsInfoArray,
  currentIndex,
  openChatting,
  selectedRadio,
  fillCrown,
}) => {
  const averageScore =
    selectedRadio === "미모 점수 높은 순" && dogsInfoArray[currentIndex]
      ? Math.ceil(dogsInfoArray[currentIndex].score.averageScore * 1000) / 1000
      : 0; // `averageScore` 기본값을 0으로 설정

  return (
    <div className="col-4">
      <div className="d-flex justify-content-center align-items-center flex-column">
        <div
          id={userInfoArray[currentIndex] ? userInfoArray[currentIndex].id : ""}
          className={`${styles.bestFlirdogImgContainer} d-flex justify-content-center align-items-center`}
          style={{
            position: "relative",
          }}
          onClick={(e) => {
            openChatting(e);
          }}
        >
          <svg
            className={moveUpDown.moveUpDown}
            style={{
              position: "absolute",
              zIndex: 79,
              top: 0,
              fill: fillCrown,
            }}
            xmlns="http://www.w3.org/2000/svg"
            height="60"
            width="60"
            viewBox="0 0 576 512"
          >
            <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" />
          </svg>
          <img
            alt=""
            className={styles.bestFlirdogImgRound}
            src={`${
              dogsInfoArray[currentIndex]
                ? "https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/" +
                  dogsInfoArray[currentIndex].image
                : "/image/nullImage/nullImage2.png"
            }`}
          />
          <div className={styles.bestFlirdogImgRoundHoverBlack}></div>
          <span className={styles.bestFlirdogImgRoundHoverText}>1:1 채팅</span>
        </div>
        <div className="d-flex justify-contnet-center align-items-center">
          <img
            alt=""
            style={{
              width: 50,
              height: 50,
              borderRadius: "20%",
              marginRight: 15,
            }}
            src={`${
              dogsInfoArray[currentIndex]
                ? "https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/flirdogStorage/aiDogProfile/" +
                  dogsInfoArray[currentIndex].imageAiProfile
                : "/image/nullImage/nullImage2.png"
            }`}
          />
          <span style={{ marginRight: 54, fontSize: 23 }}>
            {userInfoArray[currentIndex]
              ? userInfoArray[currentIndex].nickname
              : "-"}
          </span>
        </div>
        <BestFlirdogPinkLikeBtn
          selectedRadio={selectedRadio}
          text={
            selectedRadio === "미모 점수 높은 순"
              ? averageScore
              : userInfoArray[currentIndex]
              ? userInfoArray[currentIndex].communityScore
              : "0"
          }
        ></BestFlirdogPinkLikeBtn>
      </div>
    </div>
  );
};

export default BestFlirdogImg;
