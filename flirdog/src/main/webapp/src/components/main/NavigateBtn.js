import React from "react";
import "../../css/main/NavigateBtn.css";
import { Link } from "react-router-dom";

const NavigateBtn = ({ text, url, fontSize, btnWidth, btnHeight }) => {
  return (
    <>
      <Link
        to={url}
        style={{
          textDecoration: "none",
        }}
      >
        <div
          className="navigateBtn"
          style={{ fontSize: fontSize, width: btnWidth, height: btnHeight }}
        >
          {text}
        </div>
      </Link>
    </>
  );
};

export default NavigateBtn;
