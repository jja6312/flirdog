import React, {useEffect, useState} from "react";
import Accordion from "react-bootstrap/Accordion";
import styles from "../css/chatting.module.css";
import ChattingGroupBox from "./ChattingGroupBox";
import axios from "axios";

const Chatting = ({ isOpenChatting, userId, setIsOpenChatting }) => {
  const [messageRooms, setMessageRooms] = useState([]);

  useEffect(() => {
    axios.get("https://java.flirdog.store:8080/message/getMessageRooms", {params: { userId }})
        .then((res) => {
          console.log(userId)
          console.log(res.data)
          setMessageRooms(res.data);
        }). catch((error) => {
      console.log(error);
    });
  }, [userId]);

  const toggleChatting = () => {
    setIsOpenChatting(!isOpenChatting);
  };

  return (
    <div className={styles.chattingContainer} >
      <Accordion activeKey={isOpenChatting ? "0" : ""}>
        <Accordion.Item eventKey="0">
          <Accordion.Header onClick={toggleChatting}>채팅</Accordion.Header>
          <Accordion.Body style={{ padding: 0 }}>
            <div className={`${styles.chattingContentContainer} d-flex`}>
              <div
                className={`${styles.chattingContentElementLeft} d-flex justify-content-start align-items-start flex-column`}
              >
                {
                  messageRooms && (
                      messageRooms.map((room) => {
                          return (
                              <ChattingGroupBox
                                  key={room.id}
                                  id={room.id}
                                  title={room.name}
                                  image={room.image || "null"}
                              />
                          )
                      })
                    )
                }
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
