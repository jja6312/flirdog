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
        <br></br>
      </div>

      <MainBody></MainBody>
      <div style={{ height: 100 }}></div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
