import React from "react";
import { Link } from "react-router-dom";
import LeftSide from "./LeftSide";
import AdminHeader from "./AdminHeader";
// import "../s"

const ProductUpload = ({ openLeftside }) => {
  return (
    <>
      <AdminHeader></AdminHeader>
      <div className="leftRightContainer ">
        <LeftSide openLeftside={openLeftside}></LeftSide>
        {/* <div className="d-flex">여기는 상품등록</div> */}
      </div>
    </>
  );
};

export default ProductUpload;
