import React, { useState } from "react";
import styles from "../../../css/admin/0관리자홈/chatAi.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

const ChatAi = ({ AiImageInputText, setAiImageInputText }) => {
  const [toggle, setToggle] = useState(true);
  const toggleBtn = () => {
    setToggle(!toggle);
  };

  const onInputText = (e) => {
    setAiImageInputText(e.target.value);
  };

  return (
    <div
      className={`${styles.chatAi}
      ${
        toggle && styles.toggleBtnHide
      } d-flex justify-content-start align-items-center flex-column`}
    >
      <div
        className={`${styles.chatAiInputRelative} d-flex justify-content-center align-items-center`}
      >
        <div
          className={`${styles.toggleBtn}  d-flex justify-content-center align-items-center`}
          onClick={toggleBtn}
        >
          {toggle ? (
            <FontAwesomeIcon icon={faCaretUp} />
          ) : (
            <FontAwesomeIcon className={styles.toggleIcon} icon={faCaretDown} />
          )}
        </div>
        <input
          value={AiImageInputText}
          type="text"
          className={styles.chatAiTextDiv}
          placeholder="채팅을 통해 작업을 지시하고, 세부 작업을 제안받으세요."
          onChange={onInputText}
        />
      </div>
      <p className={styles.chatAiExplain}>
        ChatFlirdog can make mistakes. Consider checking important information.
      </p>
    </div>
  );
};

export default ChatAi;
