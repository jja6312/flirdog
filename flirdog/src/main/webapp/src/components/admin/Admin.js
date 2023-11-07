import React from "react";
import { Link } from "react-router-dom";
import LeftSide from "./LeftSide";
import AdminHeader from "./AdminHeader";
import AdminMainContent from "./AdminMainContent";
import "../../css/admin/rightContent.css";

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
