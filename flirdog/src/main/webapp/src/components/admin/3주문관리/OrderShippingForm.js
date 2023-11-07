import React from "react";
import { Link } from "react-router-dom";
import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";

const OrderShippingForm = ({ openLeftside }) => {
  return (
    <>
      <AdminHeader></AdminHeader>
      <div className="leftRightContainer ">
        <LeftSide openLeftside={openLeftside} selected="배송 관리"></LeftSide>
        <div className="rightContent">여기는 배송 관리</div>
      </div>
    </>
  );
};

export default OrderShippingForm;
