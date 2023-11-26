import React, {useEffect, useState} from 'react';
import {Client} from '@stomp/stompjs';

type Message = {
    roomNo: number;
    userId: number;
    nickName: string;
    messageType: number;
    content: string;
};

type Props = {
    userId: number;
    topic: string;
    nickName: string;
    roomNo: number;
};

const MessageRoom: React.FC<Props> = ({userId, nickName, topic, roomNo}) => {
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState<string>('');
    const url = 'ws://localhost:8080/ws';

    const handleMessageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessageInput(event.target.value);
    };

    useEffect(() => {
        const stomp = new Client({
            brokerURL: url,
            connectHeaders: {},
            debug: (str) => {
                console.log(str);
            },
        });

        stomp.onConnect = () => {
            console.log('Connected to WebSocket');
            setStompClient(stomp);

            stomp.subscribe(`/subscribe/${topic}-${userId}`, (message) => {
                const newMessage: Message = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        };

        stomp.activate();

        return () => {
            if (stompClient) {
                stompClient.deactivate();
            }
        };
    }, []);


    const sendMessage = () => {
        if (stompClient && messageInput.trim() !== '') {
            const message: Message = {
                roomNo,
                userId,
                nickName,
                messageType: 0,
                content: messageInput
            }
            stompClient.publish({destination: `/publish/${topic}`, body: JSON.stringify(message)});
            setMessageInput('');
        }
    };

    return (
        <div>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.userId}:</strong> {message.content}
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