import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";

const ProductListForm = ({ openLeftside }) => {
  return (
    <>
      <AdminHeader></AdminHeader>
      <div className="leftRightContainer ">
        <LeftSide
          openLeftside={openLeftside}
          selected="전체 상품 조회/수정"
        ></LeftSide>
        <div className="rightContent">여기는 상품리스트</div>
      </div>
    </>
  );
};

export default ProductListForm;
