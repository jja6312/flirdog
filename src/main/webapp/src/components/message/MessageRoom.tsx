import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import ImageAndTextInput from './ImageAndTextInput';

type Message = {
    roomNo: number;
    userId: number;
    nickName: string;
    messageType: number; // 0: 텍스트, 1: 이미지
    content: string;
};

type Props = {
    userId: number;
    nickName: string;
    topic: string;
    roomNo: number;
};

const MessageRoom: React.FC<Props> = ({ userId, nickName, topic, roomNo }) => {
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const url = 'http://localhost:8080/ws';
    const stompId = 'sub' + userId;

    useEffect(() => {
        if (stompClient) {
            return;
        }

        const sock = new SockJS(url);
        const stomp = new Client({
            webSocketFactory: () => sock,
            brokerURL: url,
            connectHeaders: {
                userId: userId.toString()
            },
            debug: (str) => {
                console.log(str);
            },
        });

        stomp.onConnect = () => {
            console.log('Connected to WebSocket');
            setStompClient(stomp);

            stomp.subscribe(`/sub/${topic}`, (message) => {
                const newMessage: Message = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }, { id: stompId });
        };

        stomp.activate();

        return () => {
            stomp.deactivate();
        };
    }, [stompId, topic, userId, url]);


    const handleImageUpload = (imageFile: File) => {
        setSelectedImage(imageFile);
    };

    const sendMessage = () => {
        if (stompClient) {
            let message: Message;
            if (selectedImage) {
                // TODO: 이미지를 서버로 업로드하는 로직 구현
                // 예: uploadImage(selectedImage).then((imageUrl) => { ... });
                message = {
                    roomNo,
                    userId,
                    nickName,
                    messageType: 1,
                    content: selectedImage.name, // or the URL returned after uploading the image
                };
            } else {
                message = {
                    roomNo,
                    userId,
                    nickName,
                    messageType: 0,
                    content: messageInput,
                };
            }
            stompClient.publish({ destination: `/pub/${topic}`, body: JSON.stringify(message) });
            setMessageInput('');
            setSelectedImage(null);
        }
    };

    // Render messages in the UI
    const renderMessages = messages.map((message, index) => (
        <div key={index}>
            {message.messageType === 0 ? (
                <div>
                    <strong>{message.nickName}:</strong> {message.content}
                </div>
            ) : (
                <div>
                    <strong>{message.nickName}:</strong>
                    <img src={message.content} alt="User uploaded" style={{ maxWidth: '200px' }} />
                </div>
            )}
        </div>
    ));

    return (
        <div>
            <div>{renderMessages}</div>
            <ImageAndTextInput
                messageInput={messageInput}
                onTextChange={setMessageInput}
                onImageUpload={handleImageUpload}
                onSendMessage={sendMessage}
            />
        </div>
    );
};

export default MessageRoom;
