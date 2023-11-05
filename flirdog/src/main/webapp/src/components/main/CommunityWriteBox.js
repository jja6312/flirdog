import React from "react";
import "../../css/main/Community.css";
import CommunityWrite from "./CommunityWrite";

const CommunityWriteBox = () => (
  <div className=" col-6 communityWriteElementContainer">
    <div className="communityWriteElement">
      <CommunityWrite></CommunityWrite>
    </div>
  </div>
);

export default CommunityWriteBox;
