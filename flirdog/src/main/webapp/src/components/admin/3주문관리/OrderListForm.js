import React, { useState } from "react";
import { Link } from "react-router-dom";
import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
import styles from "../../../css/admin/rightContent.module.css";
import RightContentHeader from "../RightContentHeader";
import AdminPageInfoText from "../AdminPageInfoText";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRegular } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import CheckBtn from "../1상품관리/CheckBtn";
import Button from "react-bootstrap/esm/Button";
import checkBtnStyle from "../../../css/admin/checkBtn.module.css";
import Swal from "sweetalert2";
import SearchForm from "../1상품관리/SearchForm";

const OrderListForm = ({ openLeftside }) => {
  const [selectedIcon, setSelectedIcon] = useState("faBorderAll");
  const [checkBtn, setCheckBtn] = useState(false);
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
          <div>[TOTAL: 47 개 / 검색 47 개]</div>

          <Button
            className="mx-2"
            variant="outline-danger"
            onClick={onDeleteSelected}
          >
            선택 일괄 삭제
          </Button>
        </div>
        <div className={styles.tableOverflow}>
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
        </div>
      </div>
    </>
  );
};

export default OrderListForm;
