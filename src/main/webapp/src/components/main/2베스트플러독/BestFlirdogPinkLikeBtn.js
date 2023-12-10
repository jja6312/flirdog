import React from "react";
import styles from "../../../css/main/2베스트플러독/bestFlirdog.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const BestFlirdogPinkLikeBtn = ({ text, selectedRadio }) => {
  return (
    <div className={`${styles.bestFlirdogPinkLikeBtn} mt-3 `}>
      {selectedRadio === "미모 점수 높은 순" ? (
        <FontAwesomeIcon
          icon={faStar}
          style={{
            width: "2.5em",
            height: "2.5em",
            color: "gold",
          }}
          size="xl"
        />
      ) : (
        <img
          src="/image/main/likeBone.png"
          alt=""
          className={`${styles.likeBoneImg} mx-2`}
        />
      )}

      <span className={styles.likeBoneText}>{text}</span>
    </div>
  );
};

export default BestFlirdogPinkLikeBtn;
