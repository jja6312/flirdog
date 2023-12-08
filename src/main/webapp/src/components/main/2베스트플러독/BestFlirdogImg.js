import React from "react";
import BestFlirdogPinkLikeBtn from "./BestFlirdogPinkLikeBtn";
import styles from "../../../css/main/2베스트플러독/bestFlirdog.module.css";

const BestFlirdogImg = ({
  userInfoArray,
  dogsInfoArray,
  currentIndex,
  openChatting,
}) => {
  return (
    <div className="col-4">
      <div className="d-flex justify-content-center align-items-center flex-column">
        <div
          className={`${styles.bestFlirdogImgContainer} d-flex justify-content-center align-items-center`}
          onClick={openChatting}
        >
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
          text={
            userInfoArray[currentIndex]
              ? userInfoArray[currentIndex].communityScore
              : "0"
          }
        ></BestFlirdogPinkLikeBtn>
      </div>
    </div>
  );
};

export default BestFlirdogImg;
