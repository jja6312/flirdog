import React, { useEffect, useState } from "react";

import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
import styles from "../../../css/admin/rightContent.module.css";
import RightContentHeader from "../RightContentHeader";

import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/esm/Button";
import checkBtnStyle from "../../../css/admin/checkBtn.module.css";
import Swal from "sweetalert2";
import axios from "axios";
import OrderCompletedList from "./OrderCompletedList";

const OrderCompletedForm = ({ openLeftside }) => {
  const [orderCompletedList, setOrderCompletedList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/admin/getOrderCompleted").then((res) => {
      setOrderCompletedList(res.data);
      console.log("orderCompletedList");
      console.log(res.data);
    });
  }, []);
  return (
    <>
      <AdminHeader></AdminHeader>

      <LeftSide openLeftside={openLeftside} selected="배송 관리"></LeftSide>
      <div className={styles.rightContent}>
        <RightContentHeader title="배송 관리" />
        <div className="d-flex align-items-center mt-4">
          <div>
            [TOTAL: {orderCompletedList.length} 개 / 검색{" "}
            {orderCompletedList.length} 개]
          </div>
        </div>
        <div className={styles.tableOverflow}>
          <OrderCompletedList
            orderCompletedList={orderCompletedList}
          ></OrderCompletedList>
        </div>
      </div>
    </>
  );
};

export default OrderCompletedForm;
