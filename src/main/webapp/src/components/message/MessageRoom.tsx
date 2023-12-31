import React, {useEffect, useRef, useState} from 'react';
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import ImageAndTextInput from './ImageAndTextInput';
import MessageList from './MessageList';

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

type Props = {
    userId: number;
    nickName: string;
    profileImage: string;
    topic: string;
    roomNo: number;
    changeRoom:number;
};

const MessageRoom: React.FC<Props> = ({ userId, nickName, profileImage, topic, roomNo, changeRoom }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [stompClient, setStompClient] = useState<Client | null>(null);


    useEffect(() => {
        setStompClient(null);
    }, [changeRoom]);

    useEffect(() => {
        axios.get('https://java.flirdog.store:8080/message/getMessages', { params: { messageRoomId:roomNo } })
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Failed to load messages:', error);
            });
    }, [roomNo]);

    const scrollToBottom = () => {
        const scrollHeight = messagesContainerRef.current?.scrollHeight;
        const height = messagesContainerRef.current?.clientHeight;
        const maxScrollTop = scrollHeight! - height!;
        messagesContainerRef.current?.scrollTo({ top: maxScrollTop, behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        if (!stompClient) {
            const sock = new SockJS('https://java.flirdog.store:8080/ws');
            const stomp = new Client({
                webSocketFactory: () => sock,
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
                });
            };

            stomp.activate();
        }

        return () => {
            stompClient?.deactivate();
        };
    }, [stompClient, userId]);

    const handleImageUpload = async (imageFile: File) => {
        try {
            const formData = new FormData();
            formData.append('file', imageFile);

            const response = await axios.post("https://java.flirdog.store:8080/admin/oneFileGo", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const message = {
                messageRoomId:roomNo,
                userId,
                nickName,
                messageType: 1,
                content: response.data,
                profileImage: profileImage
            };

            stompClient?.publish({ destination: `/pub/${topic}`, body: JSON.stringify(message) });
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const sendMessage = () => {
        if (stompClient && messageInput) {
            const message = {
                messageRoomId: roomNo,
                userId,
                nickName,
                messageType: 0,
                content: messageInput,
                profileImage: profileImage
            };
            stompClient.publish({ destination: `/pub/${topic}`, body: JSON.stringify(message) });
            setMessageInput('');
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#F0F0F0' }}>
            <div ref={messagesContainerRef} style={{ height: 'calc(100% - 120px)', overflowY: 'auto', padding: '10px' }}>
                <MessageList messages={messages} userId={userId} />
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
                <ImageAndTextInput
                    messageInput={messageInput}
                    onTextChange={setMessageInput}
                    onImageUpload={handleImageUpload}
                    onSendMessage={sendMessage}
                />
            </div>
        </div>
    );
};

export default MessageRoom;

