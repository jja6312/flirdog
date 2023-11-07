import React from "react";
import { Link } from "react-router-dom";
import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";

const OrderCheckForm = ({ openLeftside }) => {
  return (
    <>
      <AdminHeader></AdminHeader>
      <div className="leftRightContainer ">
        <LeftSide openLeftside={openLeftside}></LeftSide>
        <div className="rightContent">여기는 발주 확인</div>
      </div>
    </>
  );
};

export default OrderCheckForm;
