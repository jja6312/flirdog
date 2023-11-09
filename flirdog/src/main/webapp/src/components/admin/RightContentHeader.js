import React from "react";
import styles from "../../css/admin/rightContent.module.css";

const RightContentHeader = ({ title }) => {
  return (
    <div>
      <span className={styles.rightContentTop}>관리자페이지 홈 > </span>
      <span>{title}</span>
      <p className={`${styles.title} mt-4`}>{title}</p>
    </div>
  );
};

export default RightContentHeader;
