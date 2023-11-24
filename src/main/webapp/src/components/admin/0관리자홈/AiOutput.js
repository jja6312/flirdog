import React from "react";
import styles from "../../../css/admin/0관리자홈/aiOutput.module.css";

const AiOutput = ({ aiDogProfileImgUrl }) => {
  return (
    <div className={styles.aiOutputContainer}>
      {aiDogProfileImgUrl && (
        <img
          className={styles.aiDogProfileImg}
          src={aiDogProfileImgUrl}
          alt=""
          style={{ width: "300px" }}
        />
      )}
    </div>
  );
};

export default AiOutput;
