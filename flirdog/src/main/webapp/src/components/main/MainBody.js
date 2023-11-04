import React from "react";
import "../../css/main/MainBody.css";
import Container from "react-bootstrap/esm/Container";
import MainIcon from "./MainIcon";
import { Link } from "react-router-dom";
import BestFlirdog from "./BestFlirdog";

const MainBody = () => {
  return (
    <>
      <img src="/image/main/main1.png" style={{ width: "100%" }} />
      <Container className="px-10">
        <div className="row">
          <div className="col-3">
            <Link to="/" style={{ textDecoration: "none" }}>
              <MainIcon imgSrc="mainIcon1.png" imgText="애견 매칭" />
            </Link>
          </div>
          <div className="col-3">
            <Link to="/" style={{ textDecoration: "none" }}>
              <MainIcon imgSrc="mainIcon2.png" imgText="소모임" />
            </Link>
          </div>
          <div className="col-3">
            <Link to="/" style={{ textDecoration: "none" }}>
              <MainIcon imgSrc="mainIcon3.png" imgText="쇼핑" />
            </Link>
          </div>
          <div className="col-3">
            <Link to="/" style={{ textDecoration: "none" }}>
              <MainIcon imgSrc="mainIcon4.png" imgText="커뮤니티" />
            </Link>
          </div>
        </div>
        <BestFlirdog></BestFlirdog>
      </Container>
    </>
  );
};

export default MainBody;
