import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <Header></Header>
      <div style={{ width: "100%", textAlign: "center" }}>
        <Link to="/user/userTest">가이드라인(필독)</Link>
      </div>
      <img src="/image/main/main1.png" style={{ width: "100%" }} />
    </div>
  );
};

export default Main;
