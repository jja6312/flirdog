import React, { useEffect, useState } from "react";

import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
import styles from "../../../css/admin/rightContent.module.css";
import RightContentHeader from "../RightContentHeader";
import axios from "axios";
import OrderList from "./OrderList";

const OrderListForm = ({ openLeftside }) => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    axios.get("https://java.flirdog.store/admin/getOrderList").then((res) => {
      setOrderList(res.data);
      console.log("orderList");
      console.log(res.data);
    });
  }, []);


  return (
    <>
      <AdminHeader></AdminHeader>

      <LeftSide openLeftside={openLeftside} selected="주문 확인"></LeftSide>
      <div className={styles.rightContent}>
        <RightContentHeader title="주문 확인" />

        <div className="d-flex align-items-center mt-4">
          <div>
            [TOTAL: {orderList.length} 개 / 검색 {orderList.length} 개]
          </div>
        </div>
        <div className={styles.tableOverflow}>
          <OrderList orderList={orderList}></OrderList>
        </div>
      </div>
    </>
  );
};

export default OrderListForm;

{
  /* <Button
          className="mt-3"
          variant="success"
          onClick={onCancleOrderSelected}
        >
          선택 일괄 발주 확인
        </Button>
        <Button
          className="mt-3"
          style={{ marginLeft: "5px" }}
          variant="outline-danger"
          onClick={onCancleOrderSelected}
        >
          선택 일괄 발주 취소
        </Button> */
}
