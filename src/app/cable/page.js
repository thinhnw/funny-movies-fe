"use client"
import { useEffect, useState } from 'react';
import cable from '@/utils/cable';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const subscription = cable.subscriptions.create('NotificationChannel', {
      received: (data) => {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Chat</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatComponent;