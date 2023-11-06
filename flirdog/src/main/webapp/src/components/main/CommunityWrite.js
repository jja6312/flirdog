import React from "react";

const CommunityWrite = ({ title, createdDate, author, imgSrc, number }) => {
  return (
    <div className="col-12 d-flex justyfiy-content-start align-items-center communityWrite">
      <div className="communityWriteNumberDiv">
        <span className="communityWriteNumberSpan">{number}</span>
      </div>
      <div className="communityWriteImageDiv mx-2">
        <img src={imgSrc} className="communityWriteImage"></img>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-start">
        <p>{title}</p>
        <div className="d-flex flex-start">
          <div>
            <span>{createdDate}</span>
          </div>
          <div>
            <span>{author}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityWrite;
