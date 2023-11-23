import React from "react";
import Progressbar from "./Progressbar";
import styles from "../../../css/admin/0관리자홈/aiSupportList.module.css";

const AiSupportList = ({ subTitle, title }) => {
  return (
    <div
      className={`d-flex flex-column justyfi-content-center align-items-center p-2`}
    >
      <span className={`${styles.title}`}>{title}</span>
      <span
        className={`${styles.subTitle}  ${
          subTitle === "" && styles.subTitleMargin
        }`}
      >
        {subTitle}
      </span>
      <Progressbar completed="60"></Progressbar>
    </div>
  );
};

export default AiSupportList;
