import React from "react";
import "../../css/main/NavigateBtn.css";
import { Link } from "react-router-dom";

const NavigateBtn = ({ text, url }) => {
  return (
    <>
      <Link to={url} style={{ textDecoration: "none" }}>
        <div className="navigateBtn">{text}</div>
      </Link>
    </>
  );
};

export default NavigateBtn;
