import React from "react";

const CategoryBtn = ({ isSelect, text, onClick, size, height, fontSize }) => {
  const DivColor =
    isSelect === "notSelected" ? "whiteDivColor" : "pinkDivColor";
  return (
    <div
      className={`${size} d-flex justify-content-center align-items-center ${DivColor}`}
      onClick={onClick}
      style={{ height: height, fontSize: fontSize }}
    >
      <span>{text}</span>
    </div>
  );
};

export default CategoryBtn;
