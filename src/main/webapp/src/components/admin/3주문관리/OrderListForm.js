import React, { useEffect, useState } from "react";

import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
import styles from "../../../css/admin/rightContent.module.css";
import RightContentHeader from "../RightContentHeader";
import { Button } from "react-bootstrap";

import Swal from "sweetalert2";

import axios from "axios";
import OrderList from "./OrderList";

const OrderListForm = ({ openLeftside }) => {
  const [orderList, setOrderList] = useState([]);
  const [checkOrder, setCheckOrder] = useState([]);

  useEffect(() => {
    axios.get("https://java.flirdog.store/admin/getOrderList").then((res) => {
      setOrderList(res.data);
    });
  }, []);

  const onCancleOrderSelected = () => {
    Swal.fire({
      title: "정말 발주를 취소하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `https://java.flirdog.store/admin/cancleOrderSelected?orderId=${checkOrder}`
          )
          .then(() => {
            window.location.reload();
            Swal.fire({
              title: "발주 취소 완료!",
              icon: "success",
              position: "top",
              showConfirmButton: false,
              timer: 700,
            });
          });
      }
    });
  };
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
        <Button
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
        </Button>
        <div className={styles.tableOverflow}>
          <OrderList></OrderList>
        </div>
      </div>
    </>
  );
};

export default OrderListForm;
