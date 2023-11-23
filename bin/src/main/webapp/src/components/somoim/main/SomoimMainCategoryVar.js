import React from "react";
import styles from "../../../css/somoim/main/somoimCategoryVar.module.css";

const SomoimMainCategoryVar = ({ isSelect, text, onClick, size, height, fontSize }) => {
  const divColor = isSelect === "notSelected" ? "whiteDivColor" : "pinkDivColor";
  return (
    <div
      className={`${size} d-flex justify-content-center align-items-center ${styles[divColor]}`}
      onClick={onClick}
      style={{ height, fontSize }}
    >
      <span>{text}</span>
    </div>
  );
};

export default SomoimMainCategoryVar;
