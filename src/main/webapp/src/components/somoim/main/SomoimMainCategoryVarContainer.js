import React, { useState } from "react";
import CategoryBtn from "./SomoimMainCategoryVar";

const SomoimMainCategoryBtnContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState("모집중인 모임");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <CategoryBtn
        isSelect={selectedCategory === "모집중인 모임" ? "selected" : "notSelected"}
        text="모집중인 모임"
        onClick={() => handleCategoryClick("모집중인 모임")}
        size="col-6 col-lg-5"
        height="50px"
        fontSize="1.5rem"
      />
      <CategoryBtn
        isSelect={selectedCategory === "마감된 모임" ? "selected" : "notSelected"}
        text="마감된 모임"
        onClick={() => handleCategoryClick("마감된 모임")}
        size="col-6 col-lg-5"
        height="50px"
        fontSize="1.5rem"
      />
    </>
  );
};

export default SomoimMainCategoryBtnContainer;
