import React from "react";
import Table from "react-bootstrap/Table";
import checkBtnStyle from "../../../css/admin/checkBtn.module.css";
import Button from "react-bootstrap/esm/Button";
import styles from "../../../css/admin/rightContent.module.css";

import Swal from "sweetalert2";
import axios from "axios";

const OrderCompletedList = ({ orderCompletedList }) => {
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
            <th>배송 상태</th>
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
          {orderCompletedList.map((order, index) => (
            <tr key={order.id}>
              <td style={{ color: "blue" }}>배송완료</td>
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

export default OrderCompletedList;
