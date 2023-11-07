import React from "react";
import { Link } from "react-router-dom";

const CommunityWrite = ({ title, createdDate, author, imgSrc, number }) => {
  return (
    <div className="col-12 d-flex justyfiy-content-start align-items-center communityWrite">
      <div className="communityWriteNumberDiv">
        <span className="communityWriteNumberSpan">{number}</span>
      </div>
      <div className="communityWriteImageDiv mx-2">
        <Link to="/">
          <img src={imgSrc} className="communityWriteImage"></img>
        </Link>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-start">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <p className="communityWriteTitleText mx-2">{title}</p>
        </Link>
        <div className="d-flex flex-start">
          <div>
            <span className="communityWriteContentText mx-2">
              {createdDate}
            </span>
          </div>
          <div>
            <span className="communityWriteContentText mx-2">{author}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityWrite;
