import React from "react";
import { Link } from "react-router-dom";
import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
import styles from "../../../css/admin/rightContent.module.css";

const OrderListForm = ({ openLeftside }) => {
  return (
    <>
      <AdminHeader></AdminHeader>

      <LeftSide openLeftside={openLeftside} selected="주문 확인"></LeftSide>
      <div className={styles.rightContent}>여기는 주문리스트</div>
    </>
  );
};

export default OrderListForm;
