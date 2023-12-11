import React from 'react';
import styles from '../../css/message/MessageList.t.module.css';

type Message = {
    _id: string;
    userId: number;
    sendDate: string;
    messageRoomId: number;
    nickName: string;
    messageType: number;
    content: string;
    profileImage: string;
};

type MessageListProps = {
    messages: Message[];
    userId: number;
};


const MessageList: React.FC<MessageListProps> = ({ messages, userId }) => {
    return (
        <div>
            {messages.map((message, index) => {
                const isOwnMessage = message.userId === userId;

                const profileImage = !isOwnMessage && (
                    <img
                        src={message.profileImage === "null" ? '/image/nullImage/nullImage2.png' : "https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/flirdogStorage/aiDogProfile/"+message.profileImage}
                        alt="Profile"
                        className={styles.otherProfileImage}
                    />
                );

                return (
                    <div
                        key={index}
                        className={`${styles.messageContainer} ${isOwnMessage ? styles.ownMessageContainer : styles.otherMessageContainer}`}
                    >
                        {profileImage}
                        <div className={styles.textContainer}>
                            {!isOwnMessage && <div className={styles.nickName}>{message.nickName}</div>}
                            <div className={`${styles.message} ${isOwnMessage ? styles.ownMessage : ''}`}>
                                {message.messageType === 0 ? (
                                    <div>{message.content}</div>
                                ) : (
                                    <img src={`https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/flirdogStorage/message/${message.content}`} alt="User uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MessageList;