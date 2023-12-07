import React from 'react';
import styles from "../../../css/somoim/detail/somoimDetailCategoryBar.module.css";

const SomoimDetailCategoryBar = ({ isSelect, text, onClick, size, height, fontSize, memberCount }) => {
const divColor =
    isSelect === "notSelected" ? "whiteDivColor" : "pinkDivColor";
  return (
    <div
      className={`${size} d-flex justify-content-center align-items-center ${styles[divColor]}`}
      onClick={onClick}
      style={{ height, fontSize }}
    >
      <span>{text}</span>
      {text === '모임 멤버' && <span>({memberCount})</span>}
    </div>
  );
};

export default SomoimDetailCategoryBar;