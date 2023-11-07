import React from "react";
import { Link } from "react-router-dom";
import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
// import "../s"

const ProductUploadForm = ({ openLeftside }) => {
  return (
    <>
      <AdminHeader></AdminHeader>
      <div className="leftRightContainer ">
        <LeftSide openLeftside={openLeftside}></LeftSide>
        <div className="rightContent">여기는 상품 등록</div>
      </div>
    </>
  );
};

export default ProductUploadForm;
