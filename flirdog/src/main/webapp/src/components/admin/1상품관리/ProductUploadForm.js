import React from "react";
import { Link } from "react-router-dom";
import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
import ProductUploadFormImage from "./ProductUploadFormImage";
import ProductUploadFormHeader from "./ProductUploadFormHeader";
import styles from "../../../css/admin/rightContent.module.css";

const ProductUploadForm = ({ openLeftside }) => {
  return (
    <>
      <AdminHeader></AdminHeader>

      <LeftSide openLeftside={openLeftside} selected="상품 등록"></LeftSide>
      <div className={styles.rightContent}>
        <ProductUploadFormHeader></ProductUploadFormHeader>
        <ProductUploadFormImage></ProductUploadFormImage>
      </div>
    </>
  );
};

export default ProductUploadForm;
