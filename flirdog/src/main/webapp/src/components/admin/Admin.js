import React from "react";
import { Link } from "react-router-dom";
import LeftSide from "./LeftSide";
import AdminHeader from "./AdminHeader";

const Admin = () => {
  return (
    <>
      <AdminHeader></AdminHeader>
      <LeftSide></LeftSide>
    </>
  );
};

export default Admin;
