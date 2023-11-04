import React from "react";
import BestFlirdogPinkLikeBtn from "./BestFlirdogPinkLikeBtn";

const BestFlirdogImg = ({ srcImg, text }) => {
  return (
    <div className="col-4">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="bestFlirdogImgContainer ">
          <img className="bestFlirdogImgRound" src={`${srcImg}`} />
          <div className="bestFlirdogImgRound--Hover__black"></div>
          <span className="bestFlirdogImgRound--Hover__text">1:1 채팅</span>
        </div>
        <BestFlirdogPinkLikeBtn text={text}></BestFlirdogPinkLikeBtn>
      </div>
    </div>
  );
};

export default BestFlirdogImg;
