import React from "react";
import NavigateBtn from "../NavigateBtn";
import styles from "../../../css/main/3강아지소모임/dogSmallGroup.module.css";

const SmallGroup = () => {
  return (
    <div className={`${styles.dogSmallGroup} mt-10`}>
      <img src="/image/main/mainDogSmallGroup.png" style={{ width: "100%" }} />
      <div style={{ position: "absolute", top: "70%", left: "10%" }}>
        <NavigateBtn
          text="등록하러 가기"
          url="/"
          fontSize="2.5vw"
          btnWidth="25vw"
          btnHeight="80px"
        ></NavigateBtn>
      </div>
    </div>
  );
};

export default SmallGroup;
