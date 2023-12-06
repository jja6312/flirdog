import React, { useEffect, useState } from "react";

import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
import styles from "../../../css/admin/rightContent.module.css";
import RightContentHeader from "../RightContentHeader";
import Button from "react-bootstrap/esm/Button";
import checkBtnStyle from "../../../css/admin/checkBtn.module.css";
import Swal from "sweetalert2";
import OrderList from "./OrderList";
import axios from "axios";

const OrderListForm = ({ openLeftside }) => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/admin/getOrderList").then((res) => {
      setOrderList(res.data);
    });
  }, []);

  const onDeleteSelected = () => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제한 상품은 복원 및 수정이 불가능합니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "삭제 성공!",
          text: "파일이 삭제되었습니다.",
          icon: "success",
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

          <Button
            className="mx-2"
            variant="outline-danger"
            onClick={onDeleteSelected}
          >
            선택 일괄 삭제
          </Button>
        </div>
        <div className={styles.tableOverflow}>
          <OrderList></OrderList>
        </div>
      </div>
    </>
  );
};

export default OrderListForm;
