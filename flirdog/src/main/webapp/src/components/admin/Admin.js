import React from "react";
import { Link } from "react-router-dom";
import LeftSide from "./LeftSide";
import AdminHeader from "./AdminHeader";
import AdminMainContent from "./0관리자홈/AdminMainContent";
import KakaoMap from "../date/KakaoMap";

const Admin = () => {
  return (
    <>
      <AdminHeader></AdminHeader>
      <LeftSide></LeftSide>
      <AdminMainContent></AdminMainContent>
    </>
  );
};

export default Admin;
