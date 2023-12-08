import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import ImageAndTextInput from './ImageAndTextInput';
import MessageList from './MessageList';
import axios from 'axios';

type Message = {
    roomNo: number;
    userId: number;
    nickName: string;
    messageType: number; // 0: 텍스트, 1: 이미지
    content: string;
    profileImage: string;
};

type Props = {
    userId: number;
    nickName: string;
    profileImage: string;
    topic: string;
    roomNo: number;
};

const MessageRoom: React.FC<Props> = ({ userId, nickName, topic, roomNo, profileImage }) => {
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const url = 'http://localhost:8080/ws';
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        axios.get('/api/messages', { params: { roomNo } })
            .then(response => {
                setMessages(response.data.messages);
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
            });
        };

        stomp.activate();

        return () => {
            if (stomp) {
                stomp.deactivate();
            }
        };
    }, [topic, userId, url]);

    const handleImageUpload = (imageFile: File) => {
        setSelectedImage(imageFile);
        axios.get('', {})
    };

    const sendMessage = () => {
        if (stompClient && (messageInput || selectedImage)) {
            let message: Message;
            if (selectedImage) {
                // TODO: 이미지를 서버로 업로드하는 로직 구현
                message = {
                    roomNo,
                    userId,
                    nickName,
                    messageType: 1,
                    content: selectedImage.name, // or the URL returned after uploading the image
                    profileImage: profileImage, // Add your own logic to include the profile image
                };
            } else {
                message = {
                    roomNo,
                    userId,
                    nickName,
                    messageType: 0,
                    content: messageInput,
                    profileImage: profileImage, // Add your own logic to include the profile image
                };
            }
            stompClient.publish({ destination: `/pub/${topic}`, body: JSON.stringify(message) });
            setMessageInput('');
            setSelectedImage(null);
        }
    };

    return (
        <div style={{ position: 'relative', height: '100%', backgroundColor: '#F0F0F0' }}>
            <div ref={messagesContainerRef} style={{ height: 'calc(100% - 50px)', overflowY: 'auto', padding: '10px' }}>
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