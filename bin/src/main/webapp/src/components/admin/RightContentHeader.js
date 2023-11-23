import React from "react";
import styles from "../../css/admin/rightContent.module.css";
import { Link } from "react-router-dom";

const RightContentHeader = ({ title }) => {
  return (
    <div>
      <Link style={{ textDecoration: "none" }} to="/admin">
        <span className={styles.rightContentTop}>관리자페이지 홈 > </span>
      </Link>
      <span>{title}</span>

      <p className={`${styles.title} mt-4`}>{title}</p>
    </div>
  );
};

export default RightContentHeader;
