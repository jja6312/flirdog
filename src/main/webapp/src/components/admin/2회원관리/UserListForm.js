import React, { useEffect, useState } from "react";

import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
import styles from "../../../css/admin/rightContent.module.css";
import RightContentHeader from "../RightContentHeader";

import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/esm/Button";

import Swal from "sweetalert2";
import SearchForm from "../1상품관리/SearchForm";

import axios from "axios";
import UserList from "./UserList";

const UserListForm = ({ openLeftside }) => {
  const [userList, setUserList] = useState([]);
  const [useFilter, setUseFilter] = useState(false);
  const [useFilterCheckNumber, setUseFilterCheckNumber] = useState(0);
  const [searchValueText, setSearchValueText] = useState("");
  const [checkUser, setCheckUser] = useState([]);
  const [totalFilter, setTotalFilter] = useState([]);

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

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/getUserList")
      .then((res) => {
        console.log(res.data);

        setUserList(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
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
          <SearchForm
            placeHolder="회원 이름 검색"
            allProduct={userList}
            setUseFilter={setUseFilter}
            searchValueText={searchValueText}
            setSearchValueText={setSearchValueText}
            useFilterCheckNumber={useFilterCheckNumber}
            setUseFilterCheckNumber={setUseFilterCheckNumber}
          ></SearchForm>
        </div>

        <div className="d-flex align-items-center mt-4">
          <div>
            [검색:
            {totalFilter}개 / TOTAL: {userList.length} 개]
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
                <th>등록고유번호</th>
                <th>이메일</th>
                <th>비밀번호</th>
                <th>이름</th>
                <th>닉네임</th>
                <th>사용자 역할</th>
                <th>포인트</th>
                <th>등록일</th>
                <th>수정일</th>
              </tr>
            </thead>
            <tbody>
              <UserList
                userList={userList}
                useFilter={useFilter}
                searchValueText={searchValueText}
                setSearchValueText={setSearchValueText}
                useFilterCheckNumber={useFilterCheckNumber}
                setUseFilterCheckNumber={setUseFilterCheckNumber}
                checkUser={checkUser}
                setCheckUser={setCheckUser}
                setTotalFilter={setTotalFilter}
              ></UserList>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default UserListForm;
