import React, { useEffect, useState } from "react";

import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
import styles from "../../../css/admin/rightContent.module.css";
import RightContentHeader from "../RightContentHeader";
import axios from "axios";
import OrderCheckList from "./OrderCheckList";

const OrderCheckForm = ({ openLeftside }) => {
  const [orderCheckList, setOrderCheckList] = useState([]);

  useEffect(() => {
    axios.get("https://java.flirdog.store:8080/admin/getOrderCheckList").then((res) => {
      setOrderCheckList(res.data);
      console.log("orderCheckList");
      console.log(res.data);
    });
  }, []);
  return (
    <>
      <AdminHeader></AdminHeader>

      <LeftSide openLeftside={openLeftside} selected="발주 관리"></LeftSide>
      <div className={styles.rightContent}>
        <RightContentHeader title="발주 관리" />

        <div className="d-flex align-items-center mt-4">
          <div>
            [TOTAL: {orderCheckList.length} 개 / 검색 {orderCheckList.length}{" "}
            개]
          </div>
        </div>
        <div className={styles.tableOverflow}>
          <OrderCheckList orderCheckList={orderCheckList}></OrderCheckList>
        </div>
      </div>
    </>
  );
};

export default OrderCheckForm;
