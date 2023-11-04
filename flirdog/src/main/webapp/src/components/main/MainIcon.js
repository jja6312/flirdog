import React from "react";

const MainIcon = ({ imgSrc, imgText }) => (
  <div className="d-flex justify-content-center align-items-center flex-column">
    <img className="mainIconImg mt-3" src={`/image/main/${imgSrc}`} />
    <span className="mainIconImgText">{imgText}</span>
  </div>
);

export default MainIcon;
