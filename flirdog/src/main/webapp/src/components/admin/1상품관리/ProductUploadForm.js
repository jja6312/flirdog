import React from "react";
import { Link } from "react-router-dom";
import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
import ProductUploadFormImage from "./ProductUploadFormImage";
import styles from "../../../css/admin/rightContent.module.css";
import RightContentHeader from "../RightContentHeader";
import ProductDetail from "./1상품분류정보/ProductDetail";

const ProductUploadForm = ({ openLeftside }) => {
  return (
    <>
      <AdminHeader></AdminHeader>

      <LeftSide openLeftside={openLeftside} selected="상품 등록"></LeftSide>
      <div className={styles.rightContent}>
        <RightContentHeader title="상품등록" />
        <ProductDetail></ProductDetail>
        <ProductUploadFormImage></ProductUploadFormImage>
        <form method="post">
          <table border="1">
            <tr>
              <th>제목</th>

              <th>
                <input type="text" value="ddd" />
              </th>
            </tr>
            <tr colspan="2">
              <textarea id="summernote" name="editordata"></textarea>
            </tr>
          </table>
        </form>
      </div>
    </>
  );
};

export default ProductUploadForm;
