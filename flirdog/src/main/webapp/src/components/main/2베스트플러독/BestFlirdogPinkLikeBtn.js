import React from "react";

const BestFlirdogPinkLikeBtn = ({ text }) => {
  return (
    <div className="bestFlirdogPinkLikeBtn mt-3 ">
      <img className="likeBoneImg mx-2" src="/image/main/likeBone.png" />
      <span className="likeBoneText">{text}</span>
    </div>
  );
};

export default BestFlirdogPinkLikeBtn;
