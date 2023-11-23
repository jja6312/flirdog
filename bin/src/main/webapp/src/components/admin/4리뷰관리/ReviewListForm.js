import React, { useState } from "react";

import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
import styles from "../../../css/admin/rightContent.module.css";
import RightContentHeader from "../RightContentHeader";

import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/esm/Button";
import checkBtnStyle from "../../../css/admin/checkBtn.module.css";
// import Swal from "sweetalert2";

import FilterForm from "../1상품관리/FilterForm";
import filterForm from "../../../css/admin/filterForm.module.css";

const ReviewListForm = ({ openLeftside }) => {
  const [selectedIcon, setSelectedIcon] = useState("faBorderAll");

  // const onDeleteSelected = () => {
  //   Swal.fire({
  //     title: "정말 삭제하시겠습니까?",
  //     text: "삭제한 상품은 복원 및 수정이 불가능합니다.",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "삭제",
  //     cancelButtonText: "취소",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: "삭제 성공!",
  //         text: "파일이 삭제되었습니다.",
  //         icon: "success",
  //       });
  //     }
  //   });
  // };
  return (
    <>
      <AdminHeader></AdminHeader>

      <LeftSide
        openLeftside={openLeftside}
        selected="문의 조회/답변"
      ></LeftSide>
      <div className={styles.rightContent}>
        <RightContentHeader title="문의 조회/답변" />

        <div
          className={`${filterForm.filterFormContainer} d-flex justify-content-start align-items-center px-4`}
        >
          <FilterForm
            iconName="faBorderAll"
            titleText="전체"
            searchValue="92"
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
          ></FilterForm>
          <FilterForm
            iconName="faCommentDots"
            titleText="미답변"
            searchValue="2"
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
          ></FilterForm>
          <FilterForm
            iconName="faHeadset"
            titleText="답변완료"
            searchValue="4"
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
          ></FilterForm>
        </div>

        <div className="d-flex align-items-center mt-4">
          <div>[TOTAL: 47 개 / 검색 47 개]</div>
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
                <th>답변하기</th>
                <th>삭제</th>
                <th>게시글 번호 </th>
                <th>상품번호 </th>
                <th>응답</th>
                <th>게시판제목 </th>
                <th>게시판내용</th>
                <th>작성자 닉네임 </th>
                <th>보안</th>
                <th>게시판 생성일</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Button className={checkBtnStyle.editBtn}>답변하기</Button>
                </td>
                <td>
                  <Button variant="outline-danger">삭제</Button>
                </td>
                <td>34</td>
                <td>7</td>
                <td style={{ color: "red" }}>미답변</td>
                <td className={styles.replyYet}>미답변</td>
                <td>예압</td>
                <td>얘얘압</td>
                <td>정쥐</td>
                <td>0</td>
                <td>2023-10-16 14:32:58</td>
              </tr>
              <tr>
                <td>
                  <Button className={checkBtnStyle.editBtn}>답변하기</Button>
                </td>
                <td>
                  <Button variant="outline-danger">삭제</Button>
                </td>
                <td>34</td>
                <td>7</td>
                <td style={{ color: "rgb(96, 96, 255)" }}>답변완료</td>
                <td className={styles.replyComplete}>답변완료</td>
                <td>여기 장사잘되나요?</td>
                <td>아이스크림하나만사주세요제발요 농협3022374631211정지안</td>
                <td>정쥐</td>
                <td>0</td>
                <td>2023-10-16 14:32:58</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ReviewListForm;
