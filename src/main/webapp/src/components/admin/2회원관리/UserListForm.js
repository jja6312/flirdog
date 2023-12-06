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
import SearchDropdown from "../1상품관리/SearchDropdown";

const UserListForm = ({ openLeftside }) => {
  const [userList, setUserList] = useState([]);
  const [useFilterCheckNumber, setUseFilterCheckNumber] = useState(0);
  const [checkUser, setCheckUser] = useState([]);
  const [totalFilter, setTotalFilter] = useState([]);

  //----------------SearchDropdown.start------------------
  const [whatProduct, setWhatProduct] = useState([]);
  const [searchValueText, setSearchValueText] = useState("");
  const [useFilter, setUseFilter] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState("유저 이름");
  const [placeHolderUseState, setPlaceHolderUseState] =
    useState("회원 이름 검색");
  //----------------SearchDropdown.end------------------

  const onDeleteSelected = () => {
    if (checkUser.length === 0) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "삭제할 회원을 선택해주세요",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제한 회원은 복원이 불가능합니다.",
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
            `http://localhost:8080/admin/userDeleteSelected?userId=${checkUser}`
          )
          .then(() => {
            //삭제 후 새로고침
            window.location.reload();
            Swal.fire({
              title: "삭제 성공!",
              text: "파일이 삭제되었습니다.",
              icon: "success",
            });
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
        // SearchDropdown.selectedDropdown.start----------------------------------
        let finalFilter = res.data;

        if (useFilter && selectedDropdown) {
          switch (selectedDropdown) {
            case "유저 이름":
              finalFilter = finalFilter.filter(
                (
                  item //여기가 87번
                ) => item.name != null && item.name.includes(searchValueText)
              );
              break;

            case "유저 아이디":
              finalFilter = finalFilter.filter((item) =>
                item.id.toString().includes(searchValueText)
              );
              break;
            case "유저 이메일":
              finalFilter = finalFilter.filter((item) =>
                item.email.includes(searchValueText)
              );
              break;
            case "애견 아이디":
              finalFilter = finalFilter.filter((item) =>
                item.dogsInfos.some((dog) =>
                  dog.id.toString().includes(searchValueText)
                )
              );
              break;
            case "애견 이름":
              finalFilter = finalFilter.filter(
                (item) =>
                  item.dogsInfos != null &&
                  item.dogsInfos.some(
                    (dog) =>
                      dog.dogName != null &&
                      typeof dog.dogName !== "undefined" &&
                      dog.dogName.includes(searchValueText)
                  )
              );
              break;
            // '매칭 제목'과 '매칭 아이디'에 대한 필터링은 데이터 구조에 따라 구현해야 합니다.
          }
        }

        setWhatProduct(finalFilter);
        setTotalFilter(finalFilter.length);
        console.log("whatProduct");
        console.log(finalFilter);
        // SearchDropdown.selectedDropdown.end----------------------------------
      })
      .catch((error) => console.log(error));
  }, [
    useFilter,
    selectedDropdown,
    searchValueText,
    useFilterCheckNumber,
    placeHolderUseState,
  ]);

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
          {/* SearchDropdown.code.start--------------------------------- */}
          <SearchDropdown
            type="user" //이 모듈을 쓰려면, type을 새로 추가해서 내부코드를 수정해야함.
            selectedDropdown={selectedDropdown}
            setSelectedDropdown={setSelectedDropdown}
            setPlaceHolderUseState={setPlaceHolderUseState}
          ></SearchDropdown>
          {/* SearchDropdown.code.end--------------------------------- */}
          <SearchForm
            whatLeftMenuInnerText="회원"
            allProduct={userList}
            setUseFilter={setUseFilter}
            searchValueText={searchValueText}
            setSearchValueText={setSearchValueText}
            useFilterCheckNumber={useFilterCheckNumber}
            setUseFilterCheckNumber={setUseFilterCheckNumber}
            selectedDropdown={selectedDropdown}
            setSelectedDropdown={setSelectedDropdown}
            placeHolderUseState={placeHolderUseState}
            setPlaceHolderUseState={setPlaceHolderUseState}
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
                whatProduct={whatProduct}
              ></UserList>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default UserListForm;
