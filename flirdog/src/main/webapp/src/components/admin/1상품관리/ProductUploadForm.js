import React from "react";
import { Link } from "react-router-dom";
import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
import ProductUploadFormImage from "./ProductUploadFormImage";
import ProductUploadFormHeader from "./ProductUploadFormHeader";

const ProductUploadForm = ({ openLeftside }) => {
  return (
    <>
      <AdminHeader></AdminHeader>
      <div className="leftRightContainer ">
        <LeftSide openLeftside={openLeftside} selected="상품 등록"></LeftSide>
        <div className="rightContent">
          <ProductUploadFormHeader></ProductUploadFormHeader>
          <ProductUploadFormImage></ProductUploadFormImage>
        </div>
      </div>
    </>
  );
};

export default ProductUploadForm;
