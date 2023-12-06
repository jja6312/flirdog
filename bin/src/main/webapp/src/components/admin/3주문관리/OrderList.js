import React from "react";
import Table from "react-bootstrap/Table";

const OrderList = () => {
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
            <th>상품 번호</th>
            <th>부모 주문번호</th>
            <th>이메일</th>
            <th>재고</th>
            <th>가격</th>
            <th>전화번호</th>
            <th>주소</th>
            <th>우편번호</th>
            <th>주문상태</th>
            <th>수령인 이름</th>
            <th>수령인 전화번호</th>
            <th>주문 날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Button className={checkBtnStyle.editBtn}>발주 확인</Button>
            </td>
            <td>
              <Button variant="outline-danger">발주 취소</Button>
            </td>
            <td>1</td>
            <td>ㅇ</td>
            <td>ㅇ</td>
            <td>ㅇ</td>
            <td>ㅇ</td>
            <td>ㅇ</td>
            <td>ㅇ</td>
            <td>ㅇ</td>
            <td>ㅇ</td>
            <td>ㅇ</td>
            <td>ㅇ</td>
            <td>ㅇ</td>
            <td>ㅇ</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default OrderList;
