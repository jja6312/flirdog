import React from "react";

import LeftSide from "./LeftSide";
import AdminHeader from "./AdminHeader";
import AdminMainContent from "./0관리자홈/AdminMainContent";

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
