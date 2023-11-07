import React from "react";
import { Link } from "react-router-dom";
import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";

const UserListForm = ({ openLeftside }) => {
  return (
    <>
      <AdminHeader></AdminHeader>
      <div className="leftRightContainer ">
        <LeftSide openLeftside={openLeftside}></LeftSide>
        <div className="rightContent">여기는 유저리스트</div>
      </div>
    </>
  );
};

export default UserListForm;
