import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
import styles from "../../../css/admin/rightContent.module.css";

const ProductListForm = ({ openLeftside }) => {
  return (
    <>
      <AdminHeader></AdminHeader>

      <LeftSide
        openLeftside={openLeftside}
        selected="전체 상품 조회/수정"
      ></LeftSide>
      <div className={styles.rightContent}>여기는 상품리스트</div>
    </>
  );
};

export default ProductListForm;
