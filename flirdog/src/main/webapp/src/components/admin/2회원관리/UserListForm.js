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

const UserListForm = ({ openLeftside }) => {
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

      <LeftSide
        openLeftside={openLeftside}
        selected="회원 목록 조회/수정"
      ></LeftSide>
      <div className={styles.rightContent}>
        <RightContentHeader title="회원 목록 조회/수정" />
        <Alert
          style={{ fontSize: "0.7rem", color: "#6d6d6d" }}
          variant="danger"
        >
          - 관리자는 관리자를 해임할 수 없습니다.
        </Alert>

        <div
          className="d-flex justify-content-end mt-4"
          style={{ width: "100%" }}
        >
          <SearchForm placeHolder="회원 이름 검색"></SearchForm>
        </div>

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
                <th>선택</th>
                <th>수정</th>
                <th>삭제</th>
                <th>아이디</th>
                <th>이름</th>
                <th>우편번호</th>
                <th>주소</th>
                <th>닉네임</th>
                <th>프로필이미지</th>
                <th>비밀번호</th>
                <th>유저의 상태</th>
                <th>사용자 역할</th>
                <th>소개</th>
                <th>등록일</th>
                <th>수정일</th>
                <th>매너온도 평균점수</th>
                <th>매너온도 총점수</th>
                <th>매너온도 투표횟수</th>
                {/* 여기서부터 강아지정보 */}
                <th>강아지 아이디</th>
                <th>강아지 외모 평균 점수</th>
                <th>강아지 외모 총 점수</th>
                <th>강아지 외모 투표 수</th>
                <th>중성화 여부</th>
                <th>강아지 나이</th>
                <th>견종</th>
                <th>강아지 성별</th>
                <th>생성일</th>
                <th>수정일</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <CheckBtn
                    checkBtn={checkBtn}
                    setCheckBtn={setCheckBtn}
                  ></CheckBtn>
                </td>
                <td>
                  <Button className={checkBtnStyle.editBtn}>수정</Button>
                </td>
                <td>
                  <Button variant="outline-danger">삭제</Button>
                </td>
                <td>jja6312</td>
                <td>정지안무거북이와두루미</td>
                <td>123456</td>
                <td>주소주소주소주소</td>
                <td>뉙넴뉙넴뉙냄</td>
                <td>
                  <div className={styles.imgContainer}>
                    <img src="/image/main/exam/aiDog.png"></img>
                  </div>
                </td>
                <td>qwert1234</td>
                <td>??</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default UserListForm;
