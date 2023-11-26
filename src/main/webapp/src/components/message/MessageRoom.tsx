import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp, { Client } from 'stompjs';

type Message = {
    content: string;
    sender: string;
};

type Props = {
    userId: number;
    topic : string;
    nickname : string;
}

const MessageRoom: React.FC<Props> = ({userId, nickname, topic}) => {
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const url = 'http://localhost:8080/ws';
    const handleMessageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessageInput(event.target.value);
    };

    const sendMessage = () => {
        if (stompClient) {
            const message: Message = {
                content: messageInput,
                sender: nickname,
            };
            stompClient.send(`/publish/${topic}`, {}, JSON.stringify(message));
            setMessageInput('');
        }
    };

    useEffect(() => {
        const socket = new SockJS(url);
        const stomp = Stomp.over(socket);
        stomp.connect({}, () => {
            setStompClient(stomp);
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect(()=>{});
            }
        };
    }, []);

    useEffect(() => {
        if (stompClient) {
            const subscription = stompClient.subscribe(`/subscribe/${topic}-${userId}`, (message) => {
                const newMessage: Message = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });

            return () => {
                subscription.unsubscribe();
            };
        }
    }, [stompClient]);

    return (
        <div>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.sender}:</strong> {message.content}
                    </div>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={handleMessageInput}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default MessageRoom;