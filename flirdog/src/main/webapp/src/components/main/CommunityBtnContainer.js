import React, { useState } from "react";
import CategoryBtn from "./CategoryBtn";
import "../../css/main/CategoryBtn.css";

const CommunityBtnContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState("자유 게시판");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <CategoryBtn
        isSelect={
          selectedCategory === "자유 게시판" ? "selected" : "notSelected"
        }
        text="자유 게시판"
        onClick={() => handleCategoryClick("자유 게시판")}
        size="col-4"
        height="45px"
        fontSize="1.3rem"
      />
      <CategoryBtn
        isSelect={
          selectedCategory === "자랑 게시판" ? "selected" : "notSelected"
        }
        text="자랑 게시판"
        onClick={() => handleCategoryClick("자랑 게시판")}
        size="col-4"
        height="45px"
        fontSize="1.3rem"
      />
      <CategoryBtn
        isSelect={selectedCategory === "Q&A" ? "selected" : "notSelected"}
        text="Q&A"
        onClick={() => handleCategoryClick("Q&A")}
        size="col-4"
        height="45px"
        fontSize="1.3rem"
      />
    </>
  );
};

export default CommunityBtnContainer;
