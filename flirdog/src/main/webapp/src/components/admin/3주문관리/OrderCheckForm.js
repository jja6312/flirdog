import React from "react";
import { Link } from "react-router-dom";
import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
import styles from "../../../css/admin/rightContent.module.css";

const OrderCheckForm = ({ openLeftside }) => {
  return (
    <>
      <AdminHeader></AdminHeader>

      <LeftSide openLeftside={openLeftside} selected="발주 관리"></LeftSide>
      <div className={styles.rightContent}>여기는 발주 확인</div>
    </>
  );
};

export default OrderCheckForm;
