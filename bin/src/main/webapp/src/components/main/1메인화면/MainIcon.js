import React from "react";
import styles from "../../../css/main/1메인화면/mainIcon.module.css";

const MainIcon = ({ imgSrc, imgText }) => (
  <div className="d-flex justify-content-center align-items-center flex-column">
    <img
      alt=""
      className={`${styles.mainIconImg} mt-4`}
      src={`/image/main/${imgSrc}`}
    />
    <span className={styles.mainIconImgText}>{imgText}</span>
  </div>
);

export default MainIcon;
