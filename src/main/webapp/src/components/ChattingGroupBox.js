import React from "react";
import styles from "../css/chatting.module.css";

const ChattingGroupBox = ({ id, title, image }) => {
  return (
    <>
      <div
        className={`${styles.groupChat} p-2 d-flex justify-content-start align-items-center`}
      >
        <img
          className={`${styles.groupChatImage}`}
          src={image === "null" ? "/image/nullImage/nullImage2.png" : "/image/nullImage/nullImage2.png"}
          alt="nullImage"
        ></img>
        <div
          className={`${styles.groupChatInfoDiv} d-flex justify-content-center align-items-start flex-column`}
        >
          <span>{title}</span>
        </div>
      </div>
    </>
  );
};

export default ChattingGroupBox;
