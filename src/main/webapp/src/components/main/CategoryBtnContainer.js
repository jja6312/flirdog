import React, { useState } from "react";
import CategoryBtn from "./CategoryBtn";
import LocationSelector from "./LocationSelector";

const CategoryBtnContainer = ({
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
}) => {
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <CategoryBtn
          isSelect={
            selectedCategory === "전국 랭킹" ? "selected" : "notSelected"
          }
          text="전국 랭킹"
          onClick={() => handleCategoryClick("전국 랭킹")}
          size="col-3"
          height="60px"
          fontSize="1.7rem"
        />
        <CategoryBtn
          isSelect={
            selectedCategory === "지역 랭킹" ? "selected" : "notSelected"
          }
          text="지역 랭킹"
          onClick={() => handleCategoryClick("지역 랭킹")}
          size="col-3"
          height="60px"
          fontSize="1.7rem"
        />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        {selectedCategory === "지역 랭킹" && (
          <div className="d-flex justify-content-center align-items-center flex-column">
            <div style={{ height: 30, width: 550 }}></div>
            <div style={{ width: 612 }}>
              <LocationSelector
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                where="main"
              ></LocationSelector>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryBtnContainer;
