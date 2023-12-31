import React from "react";
import Table from "react-bootstrap/Table";
import checkBtnStyle from "../../../css/admin/checkBtn.module.css";
import Button from "react-bootstrap/esm/Button";
import styles from "../../../css/admin/rightContent.module.css";

import Swal from "sweetalert2";
import axios from "axios";

const OrderList = ({ orderList }) => {
  const onOrderCheck = (e) => {
    const checkBtnId = e.target.id;

    Swal.fire({
      title: "상품을 발주처리 하시겠습니까?",
      //물음표아이콘
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get("https://java.flirdog.store:8080/admin/orderCheck", {
            params: {
              id: checkBtnId,
            },
          })
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              icon: "success",
              title: "발주 확인 완료",
              text: "발주가 확인되었습니다.",
              showConfirmButton: false,
              timer: 700,
            });

            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const onOrderCancle = (e) => {
    const checkBtnId = e.target.id;

    Swal.fire({
      title: "상품을 발주를 취소 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get("https://java.flirdog.store:8080/admin/orderCancle", {
            params: {
              id: checkBtnId,
            },
          })
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              icon: "success",
              title: "발주 취소 완료",
              text: "발주가 취소되었습니다.",
              showConfirmButton: false,
              timer: 700,
            });

            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <>
      <Table
        className={`${styles.table} mt-3`}
        striped
        bordered
        hover
        size="sm"
      >
        <thead>
          <tr>
            <th>발주 확인</th>
            <th>발주 취소</th>
            <th>주문 번호</th>
            <th>총 가격</th>
            <th>주소</th>
            <th>우편번호</th>
            <th>전화번호</th>
            <th>등록 일시</th>
            <th>생성 날짜</th>
            <th>수정 날짜</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order, index) => (
            <tr key={order.id}>
              <td>
                <Button
                  id={order.id}
                  className={checkBtnStyle.editBtn}
                  onClick={onOrderCheck}
                >
                  발주 확인
                </Button>
              </td>
              <td>
                <Button
                  id={order.id}
                  variant="outline-danger"
                  onClick={onOrderCancle}
                >
                  발주 취소
                </Button>
              </td>
              <td>{order.id}</td>
              <td>{order.totalPrice}</td>
              <td>{order.city}</td>
              <td>{order.zipCode}</td>
              <td>{order.phone}</td>
              <td>{order.registeredDateTime}</td>
              <td>{order.createdAt}</td>
              <td>{order.modifiedAt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default OrderList;
