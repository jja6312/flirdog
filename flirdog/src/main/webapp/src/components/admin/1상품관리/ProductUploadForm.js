import React from "react";
import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
import styles from "../../../css/admin/rightContent.module.css";
import RightContentHeader from "../RightContentHeader";
import ProductDetail from "./1상품분류정보/ProductDetail";
import EditorBox from "../../EditorBox";

const ProductUploadForm = ({ openLeftside }) => {
  return (
    <>
      <AdminHeader></AdminHeader>

      <LeftSide openLeftside={openLeftside} selected="상품 등록"></LeftSide>
      <div className={styles.rightContent}>
        <RightContentHeader title="상품등록" />
        <ProductDetail></ProductDetail>

        <EditorBox></EditorBox>
      </div>
    </>
  );
};

export default ProductUploadForm;
