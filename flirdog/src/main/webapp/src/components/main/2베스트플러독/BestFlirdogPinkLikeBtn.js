import React from "react";
import styles from "../../../css/main/2베스트플러독/bestFlirdog.module.css";

const BestFlirdogPinkLikeBtn = ({ text }) => {
  return (
    <div className={`${styles.bestFlirdogPinkLikeBtn} mt-3 `}>
      <img
        className={`${styles.likeBoneImg} mx-2`}
        src="/image/main/likeBone.png"
      />
      <span className={styles.likeBoneText}>{text}</span>
    </div>
  );
};

export default BestFlirdogPinkLikeBtn;
