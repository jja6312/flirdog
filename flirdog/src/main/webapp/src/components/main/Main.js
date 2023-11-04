import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import MainBody from "./MainBody";

const Main = () => {
  return (
    <div>
      <Header></Header>
      <div style={{ width: "100%", textAlign: "center" }}>
        <Link to="/user/userTest">가이드라인(필독)</Link>
      </div>
      <MainBody></MainBody>
    </div>
  );
};

export default Main;
