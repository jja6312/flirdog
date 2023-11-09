import React from "react";
import { Link } from "react-router-dom";
import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
import styles from "../../../css/admin/rightContent.module.css";

const OrderShippingForm = ({ openLeftside }) => {
  return (
    <>
      <AdminHeader></AdminHeader>

      <LeftSide openLeftside={openLeftside} selected="배송 관리"></LeftSide>
      <div className={styles.rightContent}>여기는 배송 관리</div>
    </>
  );
};

export default OrderShippingForm;
