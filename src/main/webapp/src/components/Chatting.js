import React from "react";
import Accordion from "react-bootstrap/Accordion";
import styles from "../css/chatting.module.css";
import ChattingGroupBox from "./ChattingGroupBox";

const Chatting = () => {
  return (
    <div className={styles.chattingContainer}>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>채팅</Accordion.Header>
          <Accordion.Body style={{ padding: 0 }}>
            <div className={`${styles.chattingContentContainer} d-flex`}>
              <div
                className={`${styles.chattingContentElementLeft} d-flex justify-content-start align-items-start flex-column`}
              >
                <ChattingGroupBox
                  id="1"
                  title="(클라우드)정지안"
                  content="버거킹가실분?"
                ></ChattingGroupBox>
                <ChattingGroupBox
                  id="2"
                  title="(클라우드)김찬영"
                  content="버거킹가실분?"
                ></ChattingGroupBox>
                <ChattingGroupBox
                  id="3"
                  title="(클라우드)최병권"
                  content="버거킹가실분?"
                ></ChattingGroupBox>
                <ChattingGroupBox
                  id="4"
                  title="(클라우드)김현성"
                  content="버거킹가실분?"
                ></ChattingGroupBox>
                <ChattingGroupBox
                  id="5"
                  title="(클라우드)장종인"
                  content="버거킹가실분?"
                ></ChattingGroupBox>
                <ChattingGroupBox
                  id="6"
                  title="(클라우드)박기훈"
                  content="버거킹가실분?"
                ></ChattingGroupBox>
              </div>
              <div
                className={`${styles.chattingContentElementRight} d-flex justify-content-start align-items-start`}
              ></div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Chatting;
