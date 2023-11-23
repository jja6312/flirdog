import React from "react";
import BestFlirdogPinkLikeBtn from "./BestFlirdogPinkLikeBtn";
import styles from "../../../css/main/2베스트플러독/bestFlirdog.module.css";

const BestFlirdogImg = ({ srcImg, text }) => {
  return (
    <div className="col-4">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className={styles.bestFlirdogImgContainer}>
          <img
            alt=""
            className={styles.bestFlirdogImgRound}
            src={`${srcImg}`}
          />
          <div className={styles.bestFlirdogImgRoundHoverBlack}></div>
          <span className={styles.bestFlirdogImgRoundHoverText}>1:1 채팅</span>
        </div>
        <BestFlirdogPinkLikeBtn text={text}></BestFlirdogPinkLikeBtn>
      </div>
    </div>
  );
};

export default BestFlirdogImg;
