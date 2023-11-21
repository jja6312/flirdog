import React, { useState } from "react";
import CategoryBtn from "./SomoimMainCategoryVar";

const SomoimMainCategoryBtnContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState("신규모임");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <CategoryBtn
        isSelect={selectedCategory === "신규모임" ? "selected" : "notSelected"}
        text="신규모임"
        onClick={() => handleCategoryClick("신규모임")}
        size="col-6 col-lg-5"
        height="50px"
        fontSize="1.5rem"
      />
      <CategoryBtn
        isSelect={selectedCategory === "인기모임" ? "selected" : "notSelected"}
        text="인기모임"
        onClick={() => handleCategoryClick("인기모임")}
        size="col-6 col-lg-5"
        height="50px"
        fontSize="1.5rem"
      />
    </>
  );
};

export default SomoimMainCategoryBtnContainer;
