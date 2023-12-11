import React, {useEffect, useState} from "react";
import Accordion from "react-bootstrap/Accordion";
import styles from "../css/chatting.module.css";
import ChattingGroupBox from "./ChattingGroupBox";
import axios from "axios";
import MessageRoom from "./message/MessageRoom";

const Chatting = ({ isOpenChatting, userId, setIsOpenChatting }) => {
  const [messageRooms, setMessageRooms] = useState([]);
  const [enterMessageroom, setEnterMessageroom] = useState(null);
  const [changeRoom, setChangeRoom] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8080/message/getMessageRooms", {params: { userId }})
        .then((res) => {
          console.log(userId)
          console.log(res.data)
          setMessageRooms(res.data);
        }). catch((error) => {
      console.log(error);
    });
  }, [userId]);

  useEffect(() => {
    console.log(enterMessageroom)
  }, [enterMessageroom]);

  const toggleChatting = () => {
    setIsOpenChatting(!isOpenChatting);
  };

  const enterMessageRoomLogic = (room) =>{
    setChangeRoom(changeRoom+1);
    setEnterMessageroom(room);
  }

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
                              <div onClick={() => enterMessageRoomLogic(room)} style={{width:'100%'}}>
                                  <ChattingGroupBox
                                      key={room.id}
                                      id={room.id}
                                      title={room.otherUser.nickname}
                                      image={room.otherUserImage || "null"}
                                  />
                              </div>
                          )
                      })
                    )
                }
              </div>
              <div
                className={`${styles.chattingContentElementRight} d-flex justify-content-start align-items-start`}
              >
                {enterMessageroom !== null ? <MessageRoom
                    userId={enterMessageroom.user.id}
                    nickName={enterMessageroom.user.nickname}
                    topic = {"messageRoom"+enterMessageroom.id}
                    roomNo={enterMessageroom.id}
                    profileImage={enterMessageroom.userImage}
                    changeRoom={changeRoom}
                /> : <div></div>}
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Chatting;
