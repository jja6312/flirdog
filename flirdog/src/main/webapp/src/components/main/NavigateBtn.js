import React from "react";
import "../../css/main/NavigateBtn.css";
import { Link } from "react-router-dom";

const NavigateBtn = ({
  text,
  url,
  fontSize,
  btnWidth,
  btnHeight,
  theme,
  absolute,
  absoluteTop,
  absoluteRight,
  opacity,
}) => {
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
          style={{
            fontSize: fontSize,
            width: btnWidth,
            height: btnHeight,
            backgroundColor: theme === "white" ? "white" : "#f56084",
            color: theme === "white" ? "#f56084" : "white",
            position: absolute ? "absolute" : "",
            top: absoluteTop,
            right: absoluteRight,
            opacity: opacity,
          }}
        >
          {text}
        </div>
      </Link>
    </>
  );
};

export default NavigateBtn;
