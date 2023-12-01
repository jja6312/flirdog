import React from "react";
import styles from "../../css/main/2베스트플러독/navigateBtn.module.css";
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
  setModalShow,
}) => {
  return (
    <>
      {url === "modal" ? (
        <div
          onClick={() => {
            setModalShow(true);
          }}
          className={`${
            theme === "white" ? styles.navigateBtnWhite : styles.navigateBtnPink
          }`}
          style={{
            fontSize,
            width: btnWidth,
            height: btnHeight,
            position: absolute ? "absolute" : "",
            top: absoluteTop,
            right: absoluteRight,
            opacity,
            cursor: "pointer",
          }}
        >
          {text}
        </div>
      ) : (
        <Link
          to={url}
          style={{
            textDecoration: "none",
          }}
        >
          <div
            className={`${
              theme === "white"
                ? styles.navigateBtnWhite
                : styles.navigateBtnPink
            }`}
            style={{
              fontSize,
              width: btnWidth,
              height: btnHeight,
              position: absolute ? "absolute" : "",
              top: absoluteTop,
              right: absoluteRight,
              opacity,
            }}
          >
            {text}
          </div>
        </Link>
      )}
    </>
  );
};

export default NavigateBtn;
