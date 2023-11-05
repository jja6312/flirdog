import React from "react";

const CategoryBtn = ({ isSelect, text, onClick }) => {
  const DivColor =
    isSelect === "notSelected" ? "whiteDivColor" : "pinkDivColor";
  return (
    <div
      className={`col-3 d-flex justify-content-center align-items-center rankingBtn ${DivColor}`}
      onClick={onClick}
    >
      <span>{text}</span>
    </div>
  );
};

export default CategoryBtn;
