import React from "react";

const NextBtn = ({ text, onClick, isSatisfyForNextBtnAuth }) => {
  return (
    <>
      <div
        className="rounded d-flex justify-content-center align-items-center"
        onClick={onClick}
        style={{
          width: 130,
          height: 50,
          backgroundColor: isSatisfyForNextBtnAuth ? "#FE7394" : "gray",
          color: "white",
          cursor: "pointer",
        }}
      >
        <sapn>{text}</sapn>
      </div>
    </>
  );
};

export default NextBtn;
