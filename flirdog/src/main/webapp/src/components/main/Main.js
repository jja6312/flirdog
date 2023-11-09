import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import MainBody from "./MainBody";
import Footer from "./Footer";

const Main = () => {
  return (
    <div>
      <Header></Header>
      <div style={{ width: "100%", textAlign: "center" }}>
        <Link to="/user/userTest">가이드라인(필독)</Link>
        <Link to="/admin">관리자페이지 </Link>
      </div>

      <MainBody></MainBody>
      <div style={{ height: 100 }}></div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
