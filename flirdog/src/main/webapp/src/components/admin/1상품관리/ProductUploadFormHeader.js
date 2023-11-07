import React from "react";

const ProductUploadFormHeader = () => {
  return (
    <div>
      <div className="right--zeroColumn">
        <span style={{ color: "gray", cursor: "pointer" }}>
          관리자페이지 홈 >{" "}
        </span>
        <span id="adminPageSpan" className="specifyTitle">
          상품 등록
        </span>
      </div>
      <div className="right--firstColumn">
        <div className="title">
          <span className="flex">상품 등록</span>
        </div>
      </div>
    </div>
  );
};

export default ProductUploadFormHeader;
