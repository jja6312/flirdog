import React from "react";
import { Link } from "react-router-dom";
import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
import styles from "../../../css/admin/rightContent.module.css";

const UserListForm = ({ openLeftside }) => {
  return (
    <>
      <AdminHeader></AdminHeader>

      <LeftSide
        openLeftside={openLeftside}
        selected="회원 목록 조회/수정"
      ></LeftSide>
      <div className={styles.rightContent}>여기는 유저리스트</div>
    </>
  );
};

export default UserListForm;
